'use server';

import { addCustomer } from '@/server/services/customer.service';
import { addOrder, addOrderItem, finalizeOrder, getShipBrack, getWeight, indivPart, setOrderShipping, setSubtotal, setTotalWeight } from '@/server/services/order.service';
import { setItem } from '@/app/api/utils/localStorage'
import SaveId from '@/components/SaveId'
import { getAllBrackets } from '@/server/services/admin.service';

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
  //let val = id.find((item) => item.description);

  //console.log("list liset ",val);
  //return val.description;
  return id;
}

export async function showGroupIndiv(partNumArr){
  const itemArr = []
  for(const i of partNumArr){
    const id = await indivPart(i);
    itemArr.push(id);
  }
  //let val = id.find((item) => item.description);

  //console.log("list liset ",val);
  console.log("VALID ARRYAS?");
  for(const i of itemArr){
    console.log(i.description);
  }
  //return val.description;
  return itemArr;
}

export async function saveWeight(partNum, qty) {
    let w = 0;
    let id = await getWeight(partNum, qty).then((num) => {
        w = Number(num);
        console.log("noWeight", num);
    });
    //let val = w.find((item) => item.w)
    console.log("weights ", w);
    return w;
    
}

export async function getBrack(w) {
    let ship=0;
    let id2 = await getShipBrack(w).then((s) => {
        ship = Number(s)
    });

    return ship;
}

export async function getCompareBrackets() {
    let id = await getAllBrackets();

    return id;
}

export async function setTotWeight(orderId, w) {
    let ship=0;
    let id = await setTotalWeight(orderId, w);
    let id2 = await getShipBrack(w).then((s) => {
        ship = Number(s)
    });
    console.log(`weight ${w} shippin =0 ${ship}`)
    let id3 = await setOrderShipping(orderId, ship);
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
    console.log("FINAL WEIGHT MAYBE");
    
}