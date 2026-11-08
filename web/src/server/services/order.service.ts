import { supabaseAdmin } from '../db/supabase';

export async function addOrder(
    custId: number, sub: number, weight: number, ship: number,
    total: number, auth: string
) {
    const {data, error } = await supabaseAdmin
    .from('orders')
    .insert({customer_id: custId, subtotal: sub, total_weight: weight,
        shipping: ship, total: total, auth_number: auth,
    })
    .select('id');

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }
    const val = data.find((item) => item.id);

    console.log(data);
    console.log("data", val);
    return val;
    //return something?
}

export async function addOrderItem(
    order: number, part: number, 
    qty: number
) {
    const {data: priceDat, error: partsError} = await supabaseAdmin
    .from('parts')
    .select('price')
    .eq('number', part)

    if (partsError) {
    throw new Error(`db error: ${partsError.message}`);
    }

    const val = priceDat.find((item) => item.price);
    //console.log("price", val?.price);
    const totalPrice = qty * Number(val?.price);

    const  {data, error} = await supabaseAdmin
    .from('order_items')
    .insert({order_id: order, part_number: part, quantity: qty, price: totalPrice})

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }
}

export async function getTotalWeight(oderNum: number) {
    const {data, error} = await supabaseAdmin
    //part number not foreign key ??
    .from('order_items')
    .select(
        `order_id,
        part_number`
    )
    .eq('order_id', oderNum);

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }

    /*
    const {data: weightData, error: weightError} = await supabaseAdmin
    .from('parts')
    .select(
        'weight'
    )
    */
    let total = 0;

    for(const p of data){
        total += p.part_number //change later
    }
    
}

export async function setSubtotal(oderNum: number) {
    const {data, error} = await supabaseAdmin
    .from('order_items')
    .select(
        'price'
    )
    .eq('order_id', oderNum);

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }

    let total = 0;

    for(const p of data){
        total += p.price
    }

    console.log("TOTAL:", total);
    return total;
    
}

export async function finalizeOrder(orderNum: number, subtotal: number) {
    

    const {data, error} = await supabaseAdmin
    .from('orders')
    .update({ 'subtotal': subtotal})
    .eq('id', orderNum)

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }
}

export async function indivPart(partNum: number){
  const {data, error} = await supabaseAdmin
  .from('parts')
  .select()
  .eq('number', partNum)
  //const val = data.find((item) => item.description);

  //console.log(val);
  return data;
}