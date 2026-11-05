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

    return(
        <div>
            <ItemButton count={count} onClick={subtractCount}/>
            <ItemButton count={count} onClick={addCount} />
            <ShowItems/>
        </div>
    );
}

function ItemButton({count, onClick}){
    return(
        <button onClick={onClick} className="rounded bg-blue-500 px-4 py-2 text-white">
            Total: {count}
        </button>
    )
}