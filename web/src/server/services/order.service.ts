import { it } from 'node:test';
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

export async function getWeight(part_num: number, qty: number) {
    const {data, error} = await supabaseAdmin
    .from('parts')
    .select('weight')
    .eq('number', part_num)

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }
    const weight = data[0].weight;//data.find((item) => item.weight);
    const totWeight = Number(weight) * qty;

    return totWeight;
}

export async function setTotalWeight(orderNum: number, weight: number) {
    const {data, error} = await supabaseAdmin
    .from('orders')
    .update({'total_weight': weight})
    .eq('id', orderNum);
    
    if (error) {
    throw new Error(`db error: ${error.message}`);
    }
}
export async function setOrderShipping(orderNum: number, ship: number) {
    const {data, error} = await supabaseAdmin
    .from('orders')
    .update({'shipping': ship})
    .eq('id', orderNum);
    
    if (error) {
    throw new Error(`db error: ${error.message}`);
    }
}

export async function getShipBrack(weight: number) {
    const {data, error} = await supabaseAdmin
    .from('shipping_brackets')
    .select()
    .gt('max_weight', weight)
    .lte('min_weight', weight)
    .single()
    //gte lte

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }
    //const charge = data[0].shipping_charge;
    const charge = data.shipping_charge;
    const ship = Number(charge);
    //const ship = 0;

    console.log("Weight", weight, "shipping bracker", data);
    return ship;
    
}

/*
export async function getTotalWeight(oderNum: number) {
    const {data, error} = await supabaseAdmin
    //part number not foreign key ??
    .from('order_items')
    .select(
        `order_id,
        part_number,
        parts(number)`
    )
    .eq('order_id', oderNum);

    if (error) {
    throw new Error(`db error: ${error.message}`);
    }


     example
    const {data: teste,} = await supabaseAdmin
    //part number not foreign key ??
    .from('order_items')
    .select(
        `order_id,
        part_number,
        orders(id, customer_id, subtotal)`
    )
    .eq('order_id', oderNum);
    

    
    const {data: weightData, error: weightError} = await supabaseAdmin
    .from('parts')
    .select(
        'weight'
    )
    
    let total = 0;

    for(const p of data){
        total += p.part_number //change later
    }
    
}
*/

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

    const {data: order, error: orderErr} = await supabaseAdmin
    .from('orders')
    .select()
    .eq('id', orderNum);

    if (orderErr) {
    throw new Error(`db error: ${orderErr.message}`);
    }

    console.log("EVIL", order);
    const ship = order[0].shipping;
    const total = ship + subtotal;

    console.log(`ship ${ship} AND subtotal ${subtotal}`);

    const {data: totalDat, error: totErr} = await supabaseAdmin
    .from('orders')
    .update({'total': total})
    .eq('id', orderNum);

    if (totErr) {
    throw new Error(`db error: ${totErr.message}`);
    }
    

}

export async function indivPart(partNum: number){
  const {data, error} = await supabaseAdmin
  .from('parts')
  .select()
  .eq('number', partNum)
  .single()
  console.log("nonono", data);
  //const val = data.find((item) => item.description);

    if (error) {
    throw new Error(`db error: ${error.message}`);
  }
  if (!data) {
    return null;
  }

    return {
    number: data.number,
    description: data.description,
    price: data.price,
    weight: data.weight,
    };
}