import { supabaseAdmin } from '../db/supabase';
//https://supabase.com/docs/reference/javascript/v1/maybesingle

export async function getOrderById(id: number) {
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .select(
      `id, status, created_at, shipped_at, total_weight, subtotal, shipping, total, auth_number,
       customer_id(name, email, street, city, zip_code),
       order_items(part_number, quantity, price)`,
    )
    .eq('id', id)
    .maybeSingle();
  console.log('=========data single order=========', order);
  if (error) {
    throw new Error(`db error: ${error.message}`);
  }
  if (!order) {
    return null;
  }

  const partNumbers = order.order_items.map((item) => item.part_number);
  // console.log('=========partnumber data=========', partNumbers);
  const { data: parts, error: partsError } = await supabaseAdmin
    .from('parts')
    .select('number, description, weight')
    .in('number', partNumbers);

  if (partsError) {
    throw new Error(`legacy db error: ${partsError.message}`);
  }

  const items = order.order_items.map((item) => {
    const part = parts.find((p) => p.number === item.part_number);
    // console.log('=========orderid part=========', items);
    return {
      part_number: item.part_number,
      description: part ? part.description : 'not a known part',
      weight: part ? part.weight : 0,
      quantity: item.quantity,
      price: item.price,
      line_total: item.price * item.quantity,
    };
  });

  return {
    id: order.id,
    status: order.status,
    created_at: order.created_at,
    shipped_at: order.shipped_at,
    total_weight: order.total_weight,
    subtotal: order.subtotal,
    shipping: order.shipping,
    total: order.total,
    auth_number: order.auth_number,
    customer: order.customer_id,
    items,
  };
}
