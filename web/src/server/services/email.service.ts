import 'server-only';
import nodemailer from 'nodemailer';
import { getOrderById } from './orderDetails.service';
//https://nodemailer.com/smtp/well-known-services
const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass },
});

export async function sendEmail(to: string, subject: string, text: string) {
  if (!user || !pass) {
    throw new Error('missing GMAIL credentials from .env');
  }
  await transporter.sendMail({
    from: `JJSC Auto <${user}>`,
    to,
    subject,
    text,
  });
}

function money(n: number) {
  return `$${Number(n).toFixed(2)}`;
}

export async function sendOrderConfirmation(orderId: number, to?: string) {
  const order = await getOrderById(orderId);
  if (!order) {
    return null;
  }
  console.log('order object', order);
  const itemLines = order.items.map(
    (item) =>
      `  ${item.quantity} x ${item.description} (#${item.part_number}) @ ${money(item.price)} = ${money(item.line_total)}`,
  );
  if (itemLines.length === 0) {
    itemLines.push(` No items found in order.`);
  }
  console.log('itemline', itemLines);

  const text = [
    `Hi ${order.customer.name},`,
    '',
    `Thanks for your order! Order #${order.id} is ${order.status}.`,
    '',
    'Items:',
    ...itemLines,
    '',
    `Subtotal: ${money(order.subtotal)}`,
    `Shipping (${order.total_weight} lbs): ${money(order.shipping)}`,
    `Total: ${money(order.total)}`,
    '',
    'Shipping to:',
    `  ${order.customer.name}`,
    `  ${order.customer.street}`,
    `  ${order.customer.city} ${order.customer.zip_code}`,
    '',
    'We will email you again when your order ships.',
    '',
    'JJSC Auto',
  ].join('\n');

  const sendTo = to ?? order.customer.email;
  await sendEmail(sendTo, `JJSC Auto - Order #${order.id} confirmed`, text);
  return sendTo;
}

// Sent by the warehouse when an order is packed and shipped.
// Goes to the customer's email unless `to` overrides it. Returns the address used.
export async function sendShipmentNotice(orderId: number, to?: string) {
  const order = await getOrderById(orderId);
  if (!order) {
    return null;
  }

  const itemLines = order.items.map(
    (item) => `  ${item.quantity} x ${item.description} (#${item.part_number})`,
  );
  const shippedOn = new Date(order.shipped_at ?? Date.now()).toLocaleDateString(
    'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' },
  );

  const text = [
    `Hi ${order.customer.name},`,
    '',
    `Good news! Order #${order.id} shipped on ${shippedOn}.`,
    '',
    'In this package:',
    ...itemLines,
    '',
    `Package weight: ${order.total_weight} lbs`,
    `Order total: ${money(order.total)}`,
    '',
    'Shipping to:',
    `  ${order.customer.name}`,
    `  ${order.customer.street}`,
    `  ${order.customer.city} ${order.customer.zip_code}`,
    '',
    'Thank you for shopping with us.',
    '',
    'JJSC Auto',
  ].join('\n');

  const sendTo = to ?? order.customer.email;
  await sendEmail(sendTo, `JJSC Auto - Order #${order.id} has shipped`, text);
  return sendTo;
}

export async function sendOrderShipped(to: string, orderId: number) {
  await sendEmail(
    to,
    `JJSC Auto - Order #${orderId} shipped`,
    `Order #${orderId} has been shipped.\n\nThank you for shopping with us.`,
  );
}
