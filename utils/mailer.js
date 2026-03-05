const nodemailer = require("nodemailer");

// Create transporter (SMTP connection)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify SMTP connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP connection failed:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});

const sendEmails = async (name, email, message) => {
  try {

    // 1️⃣ Send notification email to me
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact Message",
      html: `
        <h2>New Contact Form Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    // 2️⃣ Auto reply to the visitor
    await transporter.sendMail({
      from: `"Kunal Petare" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting me",
      html: `
        <h2>Hello ${name},</h2>

        <p>Thanks for reaching out through my portfolio.</p>

        <p>I received your message and will review it shortly.  
        I will get back to you as soon as possible.</p>

        <br>

        <p>Best regards,</p>
        <b>Kunal Petare</b>
      `
    });

    console.log("Emails sent successfully");

  } catch (error) {
    console.log("Email sending error:", error);
    throw error;
  }
};

module.exports = sendEmails;