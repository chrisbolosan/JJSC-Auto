//hydration may be needed
//might want to change this into a hook but it may be overdoing it
//need a way to clear the cart

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