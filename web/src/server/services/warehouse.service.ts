import { supabaseAdmin } from '../db/supabase';

// Orders the warehouse still has to pack ('authorized' = paid, not yet shipped),
// or the most recently shipped ones when status = 'shipped'.
export async function getWarehouseOrders(status: 'authorized' | 'shipped') {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(
      'id, status, created_at, shipped_at, total_weight, customers!customer_id(name, city), order_items(quantity)',
    )
    .eq('status', status)
    .order(status === 'shipped' ? 'shipped_at' : 'created_at', {
      ascending: status !== 'shipped',
    })
    .limit(status === 'shipped' ? 25 : 500);

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }

  return (data ?? []).map((o) => {
    const customer = Array.isArray(o.customers) ? o.customers[0] : o.customers;
    return {
      id: o.id,
      status: o.status,
      created_at: o.created_at,
      shipped_at: o.shipped_at,
      total_weight: o.total_weight,
      customer_name: customer?.name ?? '',
      city: customer?.city ?? '',
      item_count: (o.order_items ?? []).reduce(
        (sum, i) => sum + Number(i.quantity ?? 0),
        0,
      ),
    };
  });
}

// Marks an order shipped and takes its parts out of inventory.
// Only flips orders that are still 'authorized', so two workstations can't ship
// (and email, and deduct stock for) the same order twice.
// Returns the updated row, or null if the order was missing or already shipped.
export async function markOrderShipped(id: number) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .update({ status: 'shipped', shipped_at: new Date().toISOString() })
    .eq('id', id)
    .eq('status', 'authorized')
    .select('id, status, shipped_at')
    .maybeSingle();

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }
  if (!data) {
    return null;
  }

  // The order is already shipped at this point, so an inventory failure is
  // reported back instead of thrown (the package has physically left).
  let inventoryError: string | null = null;
  try {
    await deductInventory(id);
  } catch (err) {
    inventoryError = (err as Error).message;
  }

  return { ...data, inventoryError };
}

// Subtracts each part's ordered quantity from inventory (never below 0).
async function deductInventory(orderId: number) {
  const { data: items, error: itemsError } = await supabaseAdmin
    .from('order_items')
    .select('part_number, quantity')
    .eq('order_id', orderId);

  if (itemsError) {
    throw new Error(`db error: ${itemsError.message}`);
  }
  if (!items || items.length === 0) {
    return;
  }

  // Total quantity per part, in case a part appears on more than one line
  const ordered = new Map<number, number>();
  for (const item of items) {
    ordered.set(
      item.part_number,
      (ordered.get(item.part_number) ?? 0) + item.quantity,
    );
  }

  const { data: stock, error: stockError } = await supabaseAdmin
    .from('inventory')
    .select('part_number, quantity')
    .in('part_number', [...ordered.keys()]);

  if (stockError) {
    throw new Error(`db error: ${stockError.message}`);
  }

  const updates = [...ordered].map(([part_number, qty]) => {
    const current =
      stock?.find((s) => s.part_number === part_number)?.quantity ?? 0;
    return { part_number, quantity: Math.max(0, current - qty) };
  });

  const { error: saveError } = await supabaseAdmin
    .from('inventory')
    .upsert(updates, { onConflict: 'part_number' });

  if (saveError) {
    throw new Error(`inventory save error: ${saveError.message}`);
  }
}
