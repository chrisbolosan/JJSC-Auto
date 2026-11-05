'use client';
import { useId } from 'react';
import { clearCart } from "@/app/api/utils/localStorage";
import { addCustomer } from '@/server/services/customer.service';
import { saveCustomer } from '@/components/customersServer';

/*
async function addUser(city: string , email: string , id: number,
    name: string, street: string, zip: string) {
    'use server';

    addCustomer(city, email, id, name, street, zip);

}*/

export default function cardAuth(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault();

    const id = 5781; //might change to uiud, doesnt do anything at the moment

    const form = e.currentTarget;
    const formData = new FormData(form);
    const nameName = formData.get("name") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const zip = formData.get("zip") as string;
    let addressBool = false;

    if(nameName.length > 0 && email.length > 0){
        if(address.length > 0 && city.length > 0 && state.length > 0){
            if(!isNaN(parseInt(zip)) && zip.length == 5){
                addressBool = true;
            }
        }
    }

    const name = formData.get("cardName") as string;
    const cardNum = formData.get("cardNum") as string;
    const cvv = formData.get("cvv") as string;
    const dat = formData.get("dat") as string;

    const month = dat.substring(0,2);
    const year = dat.substring(3,5);

    let nameBool = false;
    let cardNumBool = false;
    let cvvBool = false;
    let dateBool = false;

    const curDate = new Date();
    const m = curDate.getMonth();
    const y = curDate.getFullYear();
    const d = curDate.getDate();

    const checkDate = Date.parse(`${month}/${d}/${year}`);
    const toDate = Date.parse(`${m}/${d}/${y}`);

    if(checkDate >= toDate ){
      alert("Valid date");
      dateBool = true;
    }else{
      alert("Expired date");
    }

    if(name.length > 0){
      nameBool = true;
    }
    if(!isNaN(parseInt(cardNum)) && cardNum.length == 16){
      cardNumBool = true;
    }
    if(!isNaN(parseInt(cvv)) && cvv.length == 3){
      cvvBool = true;
    }

    if(nameBool && cardNumBool && cvvBool && dateBool && addressBool){
      alert('Valid card');

      //saveCustomer(nameName);
      saveCustomer(city, email, id, nameName, address, zip);
      //addCustomer(city, email, id, nameName, address, zip);

      //add to db and clear cart
      clearCart();
    }else{
      alert('INVALID');
    }

    alert(`Extracted info \n Name: '${name}'\n cardNum: '${cardNum}'\n cvv: '${cvv}' \n date: '${dat}' \n ${month}/${d}/${year}`);
    //clearCart();
    //console.log(id);
  }