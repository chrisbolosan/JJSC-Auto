"use client";
import {useState} from 'react';
import { getItem, setItem, getFullCart } from '@/app/api/utils/localStorage'
import { useEffect } from 'react';
import { showIndiv } from './customersServer';

export default function ShowItems(){
    const cart = getFullCart();

    return(
        <div>
            {
            cart.map((c) => (
                <div key={c}>
                {c} x {getItem(String(c))}
                </div>
            ))
            }
        </div>
    );
}

export async function itemName({item}){
    
    /*
    useEffect(() => {
        showIndiv(item);
    }, [item]);
    */

    //let name = await showIndiv(item);
    
   //showIndiv(c).then((desc) => itemName(desc))

    return(
        <p className="rounded px-4 py-2 text-black inline">{name}</p>
    )
}