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
    const orderId = Number(getItem("ID"));
    window.localStorage.clear();
    setItem("ID", orderId);
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

    console.log("cart INSIDE:", cart[0]);
    }

    console.log("cart:", cart[0]);
    
    return cart;

    //}catch(error){
     //   console.log(error);
    //}
}