"use client";
import {useState} from 'react';
import { getItem, setItem, getFullCart } from '@/app/api/utils/localStorage'
import { useEffect } from 'react';

export default function ShowItems(){
    const cart = getFullCart();
    return(
        <TheLoop cart={cart}/>
    );
}

function TheLoop({cart}){
    //let i=1;
    //for(const cor in cart){
        return(
            <div>
               item: {
               cart}
 
            </div>
        )
        //i++;
    //}
}