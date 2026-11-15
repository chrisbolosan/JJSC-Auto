import {
  sendOrderConfirmation,
  sendOrderShipped,
} from '@/server/services/email.service';

export async function POST(request: Request) {
  try {
    const { type, orderId } = await request.json();
    const myInbox = process.env.GMAIL_USER ?? '';

    if (type === 'confirmation') {
      const id = Number(orderId);
      if (!Number.isInteger(id) || id <= 0) {
        return Response.json(
          { error: 'order id must be a number' },
          { status: 400 },
        );
      }
      const sentTo = await sendOrderConfirmation(id, myInbox);
      if (!sentTo) {
        return Response.json(
          { error: `order ${id} not found` },
          { status: 404 },
        );
      }
      return Response.json({
        message: `Sent order #${id} confirmation to our gmail`,
      });
    }

    if (type === 'shipped') {
      await sendOrderShipped(myInbox, 1001);
      return Response.json({ message: 'Sent shipped email to our gmail' });
    }

    return Response.json(
      { error: 'not shipping or confirmation' },
      { status: 400 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Email failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
