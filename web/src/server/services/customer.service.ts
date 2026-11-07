
import { supabaseAdmin } from '../db/supabase';

export async function addCustomer(
    city: string, email: string, 
    name: string, street: string, zip: string
) {
    const {data, error } = await supabaseAdmin
    .from('customers')
    .insert({city: city, email: email, /*id: id,*/ name: name, street: street, zip_code: zip})
    .select('id');

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }
    const val = data.find((item) => item.id);

    console.log(data);
    console.log("data val", val);
    return val;
}
