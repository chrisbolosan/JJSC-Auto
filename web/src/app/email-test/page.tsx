'use client';
import { useState } from 'react';
import ReturnButton from '@/components/returnButton';

type EmailType = 'confirmation' | 'shipped';

export default function EmailTestPage() {
  const [orderId, setOrderId] = useState('1');
  const [result, setResult] = useState('');

  async function sendMail(type: EmailType) {
    setResult('Sending...');
    const res = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, orderId }),
    });

    const data = await res.json();
    setResult(data.message ?? `Error: ${data.error}`);
  }

  return (
    <main className="mx-auto w-full max-w-xl px-6 py-16">
      <ReturnButton />

      <div className="my-6 flex flex-col gap-4">
        <label className="flex items-center gap-2">
          Order #
          <input
            type="number"
            min="1"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-24 rounded border border-gray-300 px-2 py-1"
          />
        </label>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => sendMail('confirmation')}
            className="rounded border border-gray-300 p-4"
          >
            Order confirmation email
          </button>
          <button
            type="button"
            onClick={() => sendMail('shipped')}
            className="rounded border border-gray-300 p-4"
          >
            Send confirmation email order shipped
          </button>
        </div>

        {result && <p className="text-sm">{result}</p>}
      </div>
    </main>
  );
}
