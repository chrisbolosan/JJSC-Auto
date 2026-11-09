import { supabaseAdmin } from '../db/supabase';

export async function getAllShipping() {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('id, status, shipped_at, customers!customer_id(name, city)')
    .order('id');

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }

  return (data ?? []).map((o) => {
    // generated types may type the embed as an array, so handle both shapes
    const c = Array.isArray(o.customers) ? o.customers[0] : o.customers;
    return {
      id: o.id,
      status: o.status,
      shipped_at: o.shipped_at,
      name: c?.name ?? '',
      city: c?.city ?? '',
    };
  });
}