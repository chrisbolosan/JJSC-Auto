import { supabaseAdmin } from './supabase';
//per blackboard ERD
export async function getAllParts() {
  const { data, error } = await supabaseAdmin
    .from('parts')
    .select('number, description, price, weight, pictureURL')
    .order('number');

  if (error) {
    throw new Error(`legacy database error: ${error.message}`);
  }
  return data;
}
