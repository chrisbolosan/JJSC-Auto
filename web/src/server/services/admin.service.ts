import { supabaseAdmin } from '../db/supabase';

//admin services api here
export async function getAllShipping() {
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
