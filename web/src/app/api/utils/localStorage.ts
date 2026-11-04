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
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    }catch(error){
        console.log(error);
    }
}

export function clearCart(){
    window.localStorage.clear();
}

export function getFullCart(){
    try{
    var cart = [];

    
    const end = window.localStorage.length;
    for(let i=0; i < window.localStorage.length; i++){
        let k = window.localStorage.key(i);

        const qty = Number(getItem(String(k)));

        if(qty>0){
            cart.push(k);
            //just to have a simple space, remove later
            cart.push(" ");
        }
    }
    
    return cart;

    }catch(error){
        console.log(error);
    }
}