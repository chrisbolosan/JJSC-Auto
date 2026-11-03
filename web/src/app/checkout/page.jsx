import { products } from "@/lib/products";

export const metadata = { title: "Checkout" };
// A labeled text input, used to build the form below
// autoComplete is the hint browsers use to fill in saved details (e.g. "email", "postal-code")
function Field({ label, name, type = "text", autoComplete }) {
    return (
        <label className="block text-sm">
            {label}
            <input
                name={name}
                type={type}
                autoComplete={autoComplete}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
            />
        </label>
    );
}

// No proper cart page yet. 
// Do Later: replace the placeholder items with the real cart, add form validation, connect a payment provider, and create the order when "Place order" is clicked
export default function CheckoutPage() {
    // Placeholder cart: the first two products, one of each
    const items = products.slice(0, 2);
    const subtotal = items.reduce((sum, p) => sum + p.price, 0);

    return (
        <div>
            <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">Checkout</h1>

            <div className="mt-6 grid gap-8 md:grid-cols-3">
                <form className="space-y-8 md:col-span-2">
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
                        {/*Add the payment provider's card form here later. Don't collect */}
                        <div className="flex h-24 items-center justify-center bg-gray-100 text-sm text-gray-500">
                            Payment placeholder
                        </div>
                    </fieldset>

                    <button type="button" className="rounded bg-blue-500 px-4 py-2 text-white">
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