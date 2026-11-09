import {
  sendOrderConfirmation,
  sendOrderShipped,
} from '@/server/services/email.service';

export async function POST(request: Request) {
  try {
    const { type } = await request.json();
    const myInbox = process.env.GMAIL_USER ?? '';
    const fakeOrderId = 1001;

    if (type === 'confirmation') {
      await sendOrderConfirmation(myInbox, fakeOrderId, 123.45);
    } else if (type === 'shipped') {
      await sendOrderShipped(myInbox, fakeOrderId);
    } else {
      return Response.json(
        { error: 'not shipping or confirmation' },
        { status: 400 },
      );
    }

    return Response.json({ message: `Sent ${type} email gmail` });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Email failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
