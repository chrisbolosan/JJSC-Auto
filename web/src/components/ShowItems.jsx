"use client";
//import {useState} from 'react';
import { getItem, setItem, getFullCart } from '@/app/api/utils/localStorage'
///import { useEffect } from 'react';
import { showIndiv } from './customersServer';
import { useCallback } from 'react';
//import { indivPart } from '@/server/services/order.service';

export default function ShowItems(){
    const cart = getFullCart();

    /*
    useEffect(() => {
        showIndiv()
    }, [])
    */

    return(
        
        <div>
            Hi
            {
            cart.map((c) => (
                itemName(c)
            ))}
        </div>
        
        
        /*
        <div>
            {
            cart.map((c) => (
                <div key={c}>
                {c} x {getItem(String(c))}
                </div>
            ))
            }
        </div>
        */
        

        /*
        {
            cart.map((c) => (
                itemName(c)
            ))}
        */
    );
}

export async function itemName({item}){
    /*
    const [dat, setDat] = useState(async () => {
        const response = await showIndiv(item);
        setDat(response)
    });

    /*
    const fetchData = useCallback(async () => {
        const response = await showIndiv(item);
        setDat(response.data);
    }, [dat])
    */
   //const fetchData

   /*
    useEffect(async () => {
        const response = await showIndiv(item);
        setDat(response)
    }, []);
    */
   console.log("tiemz",item);
    return (
        <div key={item}>
        {item} x {getItem(String(item))}
        </div>
    )
    
    //const cartDB = [];
    //const carts = getFullCart();
    /*
    for(const c of carts){
        cartDB.push(showIndiv(c));
    }*/

        /*
    return(
        <div>
       {
        carts.map((c) => (
                <div key={c}>
                {c} x {getItem(String(c))}
                </div>
            ))
            }
        <div>
            LOL
        </div>
        </div>
    )*/
}