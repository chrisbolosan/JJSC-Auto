'use client';

export default function cardAuth(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("cardName") as string;
    const cardNum = formData.get("cardNum") as string;
    const cvv = formData.get("cvv") as string;
    const dat = formData.get("dat") as string;

    const month = dat.substring(0,2);
    const year = dat.substring(3,5);

    let nameBool = false;
    let cardNumBool = false;
    let cvvBool = false;
    let dateBool = false;

    const curDate = new Date();
    const m = curDate.getMonth();
    const y = curDate.getFullYear();
    const d = curDate.getDate();

    const checkDate = Date.parse(`${month}/${d}/${year}`);
    const toDate = Date.parse(`${m}/${d}/${y}`);

    if(checkDate >= toDate ){
      alert("Valid date");
      dateBool = true;
    }else{
      alert("Expired date");
    }

    if(name.length > 0){
      nameBool = true;
    }
    if(!isNaN(parseInt(cardNum)) && cardNum.length == 16){
      cardNumBool = true;
    }
    if(!isNaN(parseInt(cvv)) && cvv.length == 3){
      cvvBool = true;
    }

    if(nameBool && cardNumBool && cvvBool && dateBool){
      alert('Valid card');
    }else{
      alert('INVALID');
    }

    alert(`Extracted info \n Name: '${name}'\n cardNum: '${cardNum}'\n cvv: '${cvv}' \n date: '${dat}' \n ${month}/${d}/${year}`);
  }