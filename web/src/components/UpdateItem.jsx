"use client";
import {useState} from 'react';
import { getFullCart, getItem, setItem } from '@/app/api/utils/localStorage'
import { useEffect } from 'react';
import ShowItems from './ShowItems';

//HYDRATION NEEDED CHECK LATER
export default function UpdateItem({itemName, itemStock}){
    /*
    const [count, setCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    
    useEffect(() => {
        const savedCount = Number(getItem(itemName)) || 0;
        setCount(savedCount);
        setIsLoaded(true);
    }, [itemName]);

    useEffect(() => {
        if (isLoaded) {
            setItem(itemName, count);
        }
    }, [count, itemName, isLoaded]);
    */
    
    const [count, setCount] = useState(() => {
        const itemCount = getItem(itemName);
        return (Number(itemCount)) || 0;
    });

    useEffect(() => {
        //setCount(Number(getItem(itemName)));
        setItem(itemName, count);
        /*
        async function load() {
            setCount(Number(getItem(itemName)));
        }
        load();
        */
    }, [count, itemName]);
    //, itemName
    

    function addCount(){
        if(Number(itemStock) > count){
            setCount(count + 1);
        }
    }

    function subtractCount(){
        if(count<1){
            setCount(0);
        }else{
            setCount(count - 1);
        }
    }

    const pos = "+";
    const les = "-"

    if(itemStock > 0){
    return(
        <div>
            <ItemButton dis={les} onClick={subtractCount}/>
            <p className="rounded px-4 py-2 text-black inline">{count}</p>
            
            <ItemButton dis={pos} onClick={addCount} />
        </div>
    );
    }else{
        return(
            <div>
                <p>Not Available</p>
            </div>
        )
    }
}

//dont use 
/*
function TotalCount({count}){
    return(
        <p className="rounded px-4 py-2 text-black inline">{count}</p>
    )
}
*/

function ItemButton({dis, onClick}){
    return(
        <button onClick={onClick} className="rounded bg-blue-500 px-4 py-2 text-white">
            {dis}
        </button>
    )
}