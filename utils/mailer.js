const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmails = async (name, email, message) => {

  // Auto reply to visitor
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thanks for contacting me",
    html: `
      <h2>Hello ${name}</h2>
      <p>This is an auto reply to confirm that I received your message.</p>
      <p>Thanks for reaching out through my portfolio.</p>
      <p>I received your message and will reply soon.</p>

      <br/>
      <b>Kunal Petare</b>
    `
  });

  // Notification email to YOU
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "kunalpetare123@gmail.com",
    subject: "New Portfolio Contact Message",
    html: `
      <h3>New message from your portfolio</h3>

      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b></p>

      <p>${message}</p>
    `
  });

};

module.exports = sendEmails;