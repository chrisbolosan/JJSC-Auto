//hydration may be needed
//might want to change this into a hook but it may be overdoing it
//need a way to clear the cart
//'use client';

export function setItem(key: string, value: unknown){
    //error if there is no space in local storage
    try {
        //only strings can be saved
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch(error){
        console.log(error);
    }
}

export function getItem(key: string){
    try{
    if (typeof window !== 'undefined'){
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    }
    }catch(error){
        console.log(error);
    }
}

export function clearCart(){
    const orderId = Number(getItem("ORDER_ID"));
    window.localStorage.clear();
    setItem("ORDER_ID", orderId);
}

// Tell listeners (e.g. useLocalStorageNumber in UpdateItem) the cart changed.
function notifyCartChange(){
    window.dispatchEvent(new StorageEvent('storage'));
}

// Remove one part from the cart.
export function removeFromCart(part: number | string){
    window.localStorage.removeItem(String(part));
    notifyCartChange();
}

// Remove every part from the cart, keeping other keys like ORDER_ID.
export function emptyCart(){
    for (const part of getFullCart()){
        window.localStorage.removeItem(String(part));
    }
    notifyCartChange();
}

export function getFullCart(){
    //try{
    //let cart = [];
    const cart = [];

    if (typeof window !== 'undefined'){

    for(let i=0; i < window.localStorage.length; i++){
        const k = window.localStorage.key(i);

        const qty = Number(getItem(String(k)));

        if(qty>0 && !isNaN(parseInt(String(k)))){
            cart.push(Number(k));
            //just to have a simple space, remove later
            //cart.push(" ");
        }
    }

    }

    
    return cart;

    //}catch(error){
    //}
}