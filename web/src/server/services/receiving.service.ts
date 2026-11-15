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
  return newQuantity;
}

export async function getReceivingLogs() {
  const { data: log, error } = await supabaseAdmin
    .from('receiving_log')
    .select('id,part_number,quantity,received_at')
    .order('received_at', { ascending: false })
    .limit(20);

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }

  const partNumbers = log.map((row) => row.part_number);

  const { data: parts } = await supabaseAdmin
    .from('parts')
    .select('number, description')
    .in('number', partNumbers);

  return log.map((row) => {
    const part = parts?.find((p) => p.number === row.part_number);

    return {
      ...row,
      description: part ? part.description : 'not found part',
    };
  });
}
