
//import {} from //path

export default function Checkout() {
  return (
    <div className="bg-white">  
      <h1 className="text-yellow-500">I am checkout page </h1>
      <form >
        <button><a href="/checkout/billing" className="bg-red-500 p-2 rounded-2xl border border-amber-50"> Checkout</a> </button>
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
