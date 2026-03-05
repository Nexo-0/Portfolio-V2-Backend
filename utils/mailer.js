const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmails = async (name, email, message) => {

  try {

    // notification to you
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact Message",
      html: `
        <h2>New Contact Form Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `
    });

    // auto reply
    await resend.emails.send({
      from: "Kunal Petare <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for contacting me",
      html: `
        <h2>Hello ${name},</h2>

        <p>Thanks for reaching out through my portfolio.</p>
        <p>I received your message and will reply soon.</p>

        <br>
        <b>Kunal Petare</b>
      `
    });

  } catch (error) {
    console.log("Email error:", error);
  }

};

module.exports = sendEmails;