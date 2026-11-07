'use server';

import { addCustomer } from '@/server/services/customer.service';
import { addOrder, addOrderItem, finalizeOrder, indivPart, setSubtotal } from '@/server/services/order.service';
import { setItem } from '@/app/api/utils/localStorage'
import SaveId from '@/components/SaveId'

export async function saveCustomer(city, email ,
    name, street, zip) {

        let id = await addCustomer(city, email, name, street, zip);
        let val = id.id
        console.log("check", val);

        //SaveId(val);
        //setItem("ID", val); maybe worked
        return Number(val);
    //return{ success: true};
}

export async function saveOrder(custId, sub, weight, ship,
    total, auth) {
    let id = await addOrder(custId, sub, weight, ship,
    total, auth);

    let val = id.id;

    console.log("saveOrder", val);
    return Number(val);
}

export async function saveOrderItem(order, part, 
    qty) {
    let id = await addOrderItem(order, part, 
    qty);
    console.log(id);
}

export async function showIndiv(partNum){
  let id = await indivPart(partNum);
  let val = id.find((item) => item.description);

  return val.description;
}

export async function saveSubTotal(orderNum) {
    let id = await setSubtotal(orderNum);
    console.log("TotalChecker:", id);
    return id;
}

export async function saveFinalOrder(orderNum) {
    let sub = saveSubTotal(orderNum);
    sub.then((subtot) => {
        finalizeOrder(orderNum, subtot);
    });
    
}