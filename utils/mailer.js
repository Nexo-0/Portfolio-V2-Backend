const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmails = async (name, email, message) => {
  try {

    // Notification to YOU
    await resend.emails.send({
      from: "Portfolio <contact@kunalpetare.in>",
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact Message",
      reply_to: email,
      html: `
        <h2>New Contact Form Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `
    });

    // Auto reply to visitor
    await resend.emails.send({
      from: "Kunal Petare <contact@kunalpetare.in>",
      to: email,
      subject: "Thanks for contacting me",
      html: `
        <h2>Hello ${name},</h2>

        <p>Thanks for reaching out through my portfolio.</p>
        <p>I received your message and will review it shortly.</p>

        <br>
        <b>Kunal Petare</b>
      `
    });

    console.log("Emails sent successfully");

  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = sendEmails;