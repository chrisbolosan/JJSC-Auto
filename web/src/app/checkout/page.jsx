import { products } from "@/lib/products";
import cardAuth from "@/components/cardAuth";
import { getFullCart, getItem} from '@/app/api/utils/localStorage'
import {ShowItems} from '@/components/ShowItems'
import { get } from "http";


export const metadata = { title: "Checkout" };
// A labeled text input, used to build the form below
// autoComplete is the hint browsers use to fill in saved details (e.g. "email", "postal-code")
function Field({ label, name, type = "text", autoComplete, pattern }) {
    return (
        <label className="block text-sm">
            {label}
            <input
                name={name}
                type={type}
                autoComplete={autoComplete}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
                pattern={pattern}
            />
        </label>
    );
}

// No proper cart page yet. 
// Do Later: replace the placeholder items with the real cart, add form validation, connect a payment provider, and create the order when "Place order" is clicked
export default function CheckoutPage() {
    //const all = [0, 3]
    // Placeholder cart: the first two products, one of each
    //const full = getFullCart;
    //const it = getFullCart("5001");
    const it = getFullCart();

    const items = [];

    for(const pid of products){
      /*
        if(pid.sku === full[0] || pid.sku == full[1]){
          items.push(pid);
          console.log(full[0]);
        }*/
        //console.log(pid.sku);
        //console.log(full[0]);
        console.log(it);
      }
/*
    for(const prod of full){
      for(const pid of products){
        if(pid.sku == prod){
          items.push(pid);
        }
      }
    }*/

    const subtotal = items.reduce((sum, p) => sum + p.price, 0);

    return (
        <div>
            <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">Checkout</h1>

            <div className="mt-6 grid gap-8 md:grid-cols-3">
                <form className="space-y-8 md:col-span-2" onSubmit={cardAuth} method="post">
                    <fieldset className="space-y-3">
                        <legend className="text-lg font-semibold">Contact</legend>
                        <Field label="Email" name="email" type="email" autoComplete="email" />
                    </fieldset>

                    <fieldset className="space-y-3">
                        <legend className="text-lg font-semibold">Shipping address</legend>
                        <Field label="Full name" name="name" autoComplete="name" />
                        <Field label="Address" name="address" autoComplete="street-address" />
                        <div className="grid grid-cols-3 gap-3">
                            <Field label="City" name="city" autoComplete="address-level2" />
                            <Field label="State" name="state" autoComplete="address-level1" />
                            <Field label="ZIP code" name="zip" autoComplete="postal-code" />
                        </div>
                    </fieldset>

                    <fieldset className="space-y-3">
                        <legend className="text-lg font-semibold">Payment</legend>
                        {
                        /*Add the payment provider's card form here later. Don't collect */

                        //</*form onSubmit={/*handleSubmit} method="post">*/
                        }
                        <div className="flex h-24 items-center justify-center bg-gray-100 text-sm text-gray-500">
                          <Field label="Name on Card" name="cardName" autoComplete="name"/> 
                          <Field label="Card Number" name="cardNum" autoComplete="" pattern="[0-9]{16}"/>
                          <Field label="Expiration (MM/YY)" name="dat" autoComplete="" pattern="(0[0-9]|1[0-2])\/[0-9]{2}"/>
                          <Field label="Security Code" name="cvv" autoComplete="" pattern="[0-9]{3}"/>
                        </div>
                    </fieldset>

                    <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
                        Place order
                    </button>
                </form>

                <aside className="h-fit rounded border border-gray-300 p-4">
                    <h2 className="mb-3 text-lg font-semibold">Order summary</h2>
                    
                    <ul className="divide-y divide-gray-200">
                        {items.map((p) => (
                            <li key={p.id} className="flex justify-between py-2 text-sm">
                                <span>{p.name} x 1</span>
                                <span>${p.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 flex justify-between border-t border-gray-300 pt-2 font-semibold">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </p>
                </aside>
            </div>
        </div>
    );
}