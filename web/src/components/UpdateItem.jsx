"use client";
import {useState} from 'react';
import { getFullCart, getItem, setItem } from '@/app/api/utils/localStorage'
import { useEffect } from 'react';
import ShowItems from './ShowItems';

export default function UpdateItem({itemName}){
    const [count, setCount] = useState(() => {
        const itemCount = getItem(itemName);
        return (Number(itemCount)) || 0;
    });

    useEffect(() => {
        setItem(itemName, count);
    }, [count, itemName]);

    /*
            getFullCart();
        getItem(itemName)
    }, [count]);
    }, [count, itemName]);
    */
    function addCount(){
        setCount(count + 1);
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

    return(
        <div>
            <ItemButton dis={les} onClick={subtractCount}/>
            <TotalCount count={count}/>
            <ItemButton dis={pos} onClick={addCount} />
        </div>
    );
}

function TotalCount({count}){
    return(
        <p className="rounded px-4 py-2 text-black inline">{count}</p>
    )
}

function ItemButton({dis, onClick}){
    return(
        <button onClick={onClick} className="rounded bg-blue-500 px-4 py-2 text-white">
            {dis}
        </button>
    )
}