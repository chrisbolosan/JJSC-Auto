import 'server-only';
import { supabaseAdmin } from '../db/supabase';

export async function receiveParts(partNumber: number, qty: number) {
  const { data: part, error: partError } = await supabaseAdmin
    .from('parts')
    .select('number')
    .eq('number', partNumber)
    .maybeSingle();

  if (partError) {
    throw new Error(`db error: ${partError.message}`);
  }

  if (!part) {
    return null;
  }
  if (!qty) {
    return null;
  }
  // console.log('part found:', part, 'qty:', qty);
  // return qty;

  const { data: inv, error: invError } = await supabaseAdmin
    .from('inventory')
    .select('quantity')
    .eq('part_number', partNumber)
    .maybeSingle();

  if (invError) {
    throw new Error(`db error: ${invError.message}`);
  }
  const newQuantity = (inv ? inv.quantity : 0) + qty;

  const { error: saveError } = await supabaseAdmin
    .from('inventory')
    .upsert(
      { part_number: partNumber, quantity: newQuantity },
      { onConflict: 'part_number' },
    );

  if (saveError) {
    throw new Error(`receiving db save error : ${saveError.message}`);
  }
  // console.log('newquantity updated?', newQuantity);
  return newQuantity;
}
