//catalog api here
import { supabaseAdmin } from '../db/supabase';

//https://supabase.com/docs/reference/javascript/initializing
export async function getAllProducts() {
  const { data, error } = await supabaseAdmin
    .from('LEGACY')
    .select('part_no,description, price, weight, img_url, INVENTORY(quantity)')
    .order('part_no');

  console.log('i am all products from the DB:', data);

  if (error) {
    console.log('db error: ', error.message);
  }
  return data;
}
