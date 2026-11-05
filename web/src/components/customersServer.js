'use server';

import { addCustomer } from '@/server/services/customer.service';

export async function saveCustomer(city , email , id,
    name, street, zip) {
    //console.log("Data recieved: ", uDat);

    addCustomer(city, email, id, name, street, zip);
    return{ success: true};
}