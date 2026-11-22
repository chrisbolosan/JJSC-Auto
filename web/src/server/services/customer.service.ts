import { supabaseAdmin } from '../db/supabase';

export async function addCustomer(
  city: string,
  email: string,
  name: string,
  street: string,
  zip: string,
) {
  const { data, error } = await supabaseAdmin
    .from('customers')
    .upsert(
      {
        city: city,
        email: email,
        name: name,
        street: street,
        zip_code: zip,
      },
      { onConflict: 'email' },
    )
    .select('id');

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }
  const val = data.find((item) => item.id);

  return val;
}
