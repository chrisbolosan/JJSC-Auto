
import { supabaseAdmin } from '../db/supabase';

export async function addCustomer(
    city: string, email: string, id: number,
    name: string, street: string, zip: string
) {
    const {data, error } = await supabaseAdmin
    .from('customers')
    .insert({city: city, email: email, /*id: id,*/ name: name, street: street, zip_code: zip})
    .select();

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }

    console.log(data);
    //return something?
}
