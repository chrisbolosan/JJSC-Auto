'use client';

export default function Billing() {

  function handleSubmit(e){
    e.preventDefault;

    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const cardNum = formData.get("cardNum");
    const cvv = formData.get("cvv");
    const dat = formData.get("dat");

    let month = dat.substring(0,2);
    let year = dat.substring(3,5);

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


  return (
    <div className="bg-white">  
      <h1 className="text-yellow-500">I am Billing page </h1>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="name">Name</label><br></br>
        <input type="text" id="name" name="name" placeholder="name"></input><br></br>
        <label htmlFor="cardNum">CardNum</label><br></br>

        <input type="text" id="cardNum" name="cardNum" placeholder="cardNum"
        //pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
        >
        </input><br></br>

        <input type="text" id="dat" name="dat" placeholder="MM/YY"
        pattern="(0[0-9]|1[0-2])\/[0-9]{2}"
        ></input><br></br>

        <label htmlFor="cvv">cvv</label><br></br>
        <input type="text" id="cvv" hint="cvv" name="cvv" placeholder="cvv"
        pattern="[0-9]{3}"
        ></input><br></br>
        <button type="submit" className="bg-red-500 p-1 rounded-2xl border border-amber-50">Submit</button>
      </form>
    </div>
  );
}