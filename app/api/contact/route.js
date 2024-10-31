import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true, // true for 465, false for 2525
    auth: {
      user: process.env.UKRNET_USER, // Ukr.net email address
      pass: process.env.UKRNET_PASS, // Ukr.net email password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.RECEIVER_EMAIL, // Your email
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
