import { receiveParts } from '@/server/services/receiving.service';

export async function POST(request: Request) {
  try {
    const { partNumber, quantity } = await request.json();
    const part = Number(partNumber);
    const qty = Number(quantity);

    const onHand = await receiveParts(part, qty);

    if (onHand === null) {
      return Response.json(
        { error: `part ${part} not found` },
        { status: 404 },
      );
    }
    console.log('onhand', onHand);

    return Response.json({
      message: `Received ${qty} of part #${part}. Currently now have ${onHand} on hand.`,
      onHand,
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
