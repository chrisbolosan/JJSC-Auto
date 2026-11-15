"use client";
import {useState} from 'react';
import { getItem, setItem, getFullCart } from '@/app/api/utils/localStorage'
import { useEffect } from 'react';
import { showIndiv, showGroupIndiv, saveWeight, getBrack, getCompareBrackets } from './customersServer';
import { useCallback } from 'react';
//import { indivPart } from '@/server/services/order.service';

export default function ShowItems(){
    const cart = getFullCart();

    let weightState = 0;

    const[partDat, setPartDat] = useState(null);
    const[shipDat, setShipDat] = useState(weightState);
    const[brackDat, setBrackDat] = useState(null);
    const[mounted, setMounted] = useState(false);


    useEffect(() => {

        if(!mounted){
        const fetchData = async () =>{
            const result = await showGroupIndiv(cart);
            setPartDat(result);
        };
        fetchData();

        const fetchShip = async () =>{
            const wresult = await getBrack(weightState);
            setShipDat(wresult);
            return wresult;
        };
        fetchShip();

        const fetchBrack = async () =>{
            const bresult = await getCompareBrackets();
            setBrackDat(bresult);
        }
        fetchBrack();
        

        setMounted(true);
        }
    }, [ showGroupIndiv, getBrack, shipDat ])

    if (!mounted) return null; // Matches server render
    
    let total = 0;
    let weightT = 0;
    for(const p of partDat){
        total += (Number(p.price)*getItem(String(p.number)));
        weightT += (Number(p.weight)*getItem(String(p.number)))
    }
    weightState = weightT;

    let shipCharge = 0;
    for(const b of brackDat){
        if(b.min_weight<= weightState && weightState< b.max_weight){
            shipCharge = b.shipping_charge;
        }
    }
   //setShipDat(3);
    

    return(
 
        <div>
            
            {/*
            cart.map((c) => (
                <div key={c}>
                {c} x {getItem(String(c))}
                </div>
            ))
                */
            }
        {
            partDat.map((p, index) => (
                <div key={index}>
                    {`${p.description} x ${getItem(String(p.number))}   $${(Number(p.price)*getItem(String(p.number)))}`}
                </div>
            ))
                
        }
        <div>subtotal: ${total}</div>
        <div>total Weight: {weightT}</div>
        <div>shipping: {shipCharge}</div>
        </div>

        
    );
}
