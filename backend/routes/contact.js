const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchUser');
const nodemailer = require("nodemailer");
const JWT_SECRET = 'YourSecretKeyHere';

const sendContactEmail = async (name, email, message,mobileNumber, id, req) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "deveshdiliprathi@gmail.com",
        pass: "sqxofcmuzklsaait" 
      }
    });

    const mailOptions = {
      from: email,
      to: "deveshdiliprathi@gmail.com",
      subject: 'User Wants To Contact You',
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        <p>Number: ${mobileNumber}<p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.response);
  } catch (error) {
    console.log(error.message);
  }
};

router.post('/createcontact', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('message', 'Message must be at least 5 characters').isLength({ min: 5 }),
  body('mobileNumber','Phone No Must be atleast 10 digit long').isLength({min:10})
], fetchuser, async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  
  try {
    const { name, email, message,mobileNumber } = req.body;

    // Create a new contact
    const contact = await Contact.create({
      name,
      message,
      email,
      mobileNumber,
      user: req.user.id
    });

    // Send contact email
    sendContactEmail(name, email, message,mobileNumber, req.user.id, req);

    success = true;
    res.json({ success, message: "Contact created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;