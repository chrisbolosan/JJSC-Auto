import 'server-only';
import { supabaseAdmin } from '../db/supabase';

export async function receiveParts(partNumber: number, qty: number) {
  const { data: part, error: partError } = await supabaseAdmin
    .from('parts')
    .select('number')
    .eq('number', partNumber)
    .maybeSingle();
  console.log('receiving part number', part);
  if (partError) {
    throw new Error(`db error: ${partError.message}`);
  }

  if (!part) {
    return null;
  }
  if (!qty) {
    return null;
  }
}
