const Contact = require("../models/Contact");
const sendEmails = require("../utils/mailer");

exports.submitContact = async (req, res) => {
  try {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const contact = new Contact({ name, email, message });

    await contact.save();

    await sendEmails(name, email, message);

    res.status(200).json({
      success: true,
      message: "Message saved and emails sent"
    });

  } catch (error) {

    console.error("Contact API error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
};