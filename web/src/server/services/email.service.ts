import 'server-only';
import nodemailer from 'nodemailer';
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
  console.log(
    ' send checking contents transport - ',
    transporter.sendMail({
      from: `JJSC Auto <${user}>`,
      to,
      subject,
      text,
    }),
  );
  await transporter.sendMail({
    from: `JJSC Auto <${user}>`,
    to,
    subject,
    text,
  });
}

export async function sendOrderConfirmation(
  to: string,
  orderId: number,
  total: number,
) {
  await sendEmail(
    to,
    `JJSC Auto - Order #${orderId} confirmed`,
    `Thank you. ${orderId} is authorized.\nTotal: $${total.toFixed(2)}\n\n We will email you again when your order ships!`,
  );
}

export async function sendOrderShipped(to: string, orderId: number) {
  await sendEmail(
    to,
    `JJSC Auto - Order #${orderId} shipped`,
    `Order #${orderId} has been shipped.\n\nThank you for shopping with us.`,
  );
}
