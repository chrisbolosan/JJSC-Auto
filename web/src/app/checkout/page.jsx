
//import {} from //path
export default function Checkout() {
  return (
    <div className="bg-white">  
      <h1 className="text-yellow-500">I am checkout page </h1>
      <form >
        <label htmlFor="name">Name</label><br></br>
        <input type="text" id="name" placeholder="name"></input><br></br>
        <label htmlFor="cardNum">CardNum</label><br></br>
        <input type="text" id="cardNum" placeholder="cardNum"></input><br></br>
        <input type="month" id="dat"></input><br></br>
        <label htmlFor="cvv">cvv</label><br></br>
        <input type="text" id="cvv" hint="cvv" placeholder="cvv"></input><br></br>
        <button type="submit" className="bg-red-500 p-5 rounded-2xl border border-amber-50">Submit</button>
      </form>
    </div>
  );
}
//function to check if there are current num of digits in inputs
//check if cardnum and cvv are only numbers
//check if date is valid
//date will be text then formatted to date
//get last 4 digits? or make auth code on confirm

//create orders id if cart is empty
//cookies with order id to save items on cart?
//or same thing but a cart tablee
