'use client';
import ReturnButton from '@/components/returnButton';

type EmailType = 'confirmation' | 'shipped';

export default function EmailTestPage() {
  async function sendMail(type: EmailType) {
    const res = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    });

    const data = await res.json();
    console.log('im fishing data', data);
  }

  return (
    <main className="mx-auto w-full max-w-xl px-6 py-16">
      <ReturnButton />

      <div className="my-6 flex gap-4">
        <button
          type="button"
          onClick={() => sendMail('confirmation')}
          className="rounded border border-gray-300 p-4"
        >
          Send order confirmation
        </button>
        <button
          type="button"
          onClick={() => sendMail('shipped')}
          className="rounded border border-gray-300 p-4"
        >
          Send confirmation email order shipped
        </button>
      </div>
    </main>
  );
}
