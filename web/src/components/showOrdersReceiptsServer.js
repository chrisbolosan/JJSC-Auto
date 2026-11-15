'use server';

import { addCustomer } from '@/server/services/customer.service';
import { addOrder, addOrderItem, finalizeOrder, getShipBrack, getWeight, indivPart, setOrderShipping, setSubtotal, setTotalWeight } from '@/server/services/order.service';
import { setItem } from '@/app/api/utils/localStorage'
import SaveId from '@/components/SaveId'
import {getOrderById} from '@/server/services/orderDetails.service'

export async function getOrderDetails(orderID){
    const order = await getOrderById(Number(orderID));
    //const cust = order.customer_id;
    //console(`Read cust ${cust[1]}`);
    console.log(`ID: ${order.id} total ${order.total} in ${order.city}`);
    return order;
}
