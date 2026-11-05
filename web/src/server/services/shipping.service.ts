import { supabaseAdmin } from '../db/supabase';

//function to fetch attibutes needed for @/shipping
export async function getAllShipping() {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('id,status,shipped_at,customer_id(name, city)')
    .order('id');

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }
  return data;
}