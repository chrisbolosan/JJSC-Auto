import { supabaseAdmin } from '../db/supabase';

//admin services api here
export async function getAllBrackets() {
  const { data, error } = await supabaseAdmin
    .from('shipping_brackets')
    .select('id, shipping_charge, min_weight, max_weight')
    .order('id');

  // console.log('i am all shipping from the DB:', data);

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }
  return data;
}

export async function updateShipping(
  id: number,
  updatedFields: {
    shipping_charge: number;
    min_weight: number;
    max_weight: number;
  },
) {
  const { data, error } = await supabaseAdmin
    .from('shipping_brackets')
    .update(updatedFields)
    .eq('id', id)
    .select();

  console.log('i am updated shipping from the DB:', data);

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }

  return data;
}

export async function getAllOrders() {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('id, status, created_at, customers!customer_id(name), order_items(quantity, price)')
    .order('id');

  // console.log('i am all shipping from the DB:', data);

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }

  return (data ?? []).map((o) => {
    // generated types may type the embed as an array, so handle both shapes
    const customer = Array.isArray(o.customers) ? o.customers[0] : o.customers;
    const items = o.order_items ?? [];

    return {
      id: o.id,
      status: o.status,
      created_at: o.created_at,
      customer_name: customer?.name ?? '',
      item_count: items.reduce((sum, i) => sum + Number(i.quantity ?? 0), 0),
      total: items.reduce(
        (sum, i) => sum + Number(i.quantity ?? 0) * Number(i.price ?? 0),
        0
      ),
    };
  });
}