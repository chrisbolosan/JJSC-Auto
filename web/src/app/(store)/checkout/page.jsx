import cardAuth from '@/components/cardAuth';
import { getFullCart } from '@/app/api/utils/localStorage';
import ShowItems from '@/components/ShowItems';
import { getAllProducts } from '@/server/services/catalog.service';

export const metadata = { title: 'Checkout' };

function Field({ label, name, type = 'text', autoComplete, pattern }) {
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

export default function CheckoutPage() {
  const items = getFullCart();

  async function cartProducts() {
    const it = getFullCart();
    const allP = await getAllProducts();
    for (const p of allP) {
      for (const c of it) {
        if (p.number == Number(c.key)) {
          console.log('yo');
          console.log(c.key);
        }
      }
      console.log('LOL', p.number);
    }
    /*
        for(const c of it){
            console.log("bedtiem", String(c));
        }
            */
    // console.log(it);
  }

  const subtotal = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <div>
      <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">
        Checkout
      </h1>

      <div className="mt-6 grid gap-8 md:grid-cols-3">
        <form
          className="space-y-8 md:col-span-2"
          onSubmit={cardAuth}
          method="post"
        >
          <fieldset className="space-y-3">
            <legend className="text-lg font-semibold">Contact</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
            />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-lg font-semibold">Shipping address</legend>
            <Field label="Full name" name="name" autoComplete="name" />
            <Field
              label="Address"
              name="address"
              autoComplete="street-address"
            />
            <div className="grid grid-cols-3 gap-3">
              <Field label="City" name="city" autoComplete="address-level2" />
              <Field label="State" name="state" autoComplete="address-level1" />
              <Field label="ZIP code" name="zip" autoComplete="postal-code" />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-lg font-semibold">Payment</legend>

            <div className="flex h-24 items-center justify-center bg-gray-100 text-sm text-gray-500">
              <Field label="Name on Card" name="cardName" autoComplete="name" />
              <Field
                label="Card Number"
                name="cardNum"
                autoComplete=""
                pattern="[0-9]{16}"
              />
              <Field
                label="Expiration (MM/YY)"
                name="dat"
                autoComplete=""
                pattern="(0[0-9]|1[0-2])\/[0-9]{2}"
              />
              <Field
                label="Security Code"
                name="cvv"
                autoComplete=""
                pattern="[0-9]{3}"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Place order
          </button>
        </form>

        <aside className="h-fit rounded border border-gray-300 p-4">
          <ShowItems />
        </aside>
      </div>
    </div>
  );
}
