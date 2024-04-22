const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchUser');
const nodemailer = require("nodemailer")
const JWT_SECRET = 'Harryisagoodb$oy';

const sendVerifyMail = async(name, email, id, req) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: "deveshdiliprathi@gmail.com",
        pass: "sqxofcmuzklsaait" // Provide your email password here
      }
    });
    
    const preuser = await User.findOne({ email });
     
    const otp = Math.floor((Math.random() * 900000)+100000);
    await User.findOneAndUpdate({ email }, { otp });
    const mailOptions = {
      from: "deveshdiliprathi@gmail.com",
      to: email,
      subject: "Verify your account",
      html: `<h1>Hi ${name}</h1><br/>
             The OTP for your login is ${otp}</a>`
    };

    const result = await transporter.sendMail(mailOptions,function(error,info){
      if(!error){
        console.log(`Email sent successfully!`,info.response);
      }
      else{
        return error;
      }

    });
    console.log("Email sent:", result.response);
  } catch (error) {
    console.log(error.message);
  }
};

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('first_name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      first_name: req.body.first_name,
      last_name : req.body.last_name ,
      password: secPass,
      email: req.body.email,
      otp:123
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    // Call sendVerifyMail with the required data and req object
    sendVerifyMail(req.body.name, req.body.email, user.id, req);

    success=true;
    res.json({success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

const verify = async (req, res) => {
  try {
    const updatedInfo = await User.updateOne(
      { _id: req.user.id },
      { $set: { is_verified: 1 } }
    );
    console.log(updatedInfo);
    res.render("email_verification");
  } catch (error) {
    console.log(error.message);
  }
};

router.get('/get-otp/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ otp: user.otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/googlesignup', async (req, res) => {
  let success = false;
  let signup = false;
  const { email_verified, email, name, clientId } = req.body;

  if (email_verified) {
      try {
          let user = await User.findOne({ email });
          if (!user) {
              // Create a new user if the user doesn't exist
              const password = email + clientId;
              user = new User({
                  email,
                  password:password,  // Note: You should hash the password before saving it to the database
                  name,
                  
                  // Add more fields as needed
              });

              await user.save();

              const data = {
                  user: {
                      id: user.id
                  }
              }

              const authtoken = jwt.sign(data, JWT_SECRET);
              success = true;
              signup = true;
              res.header('Cross-Origin-Opener-Policy', 'unsafe-none');
              res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
              res.json({
                  success,
                  authtoken,
                  email: user.email,
                  name: user.name,
                  signup
                  // Add more attributes as needed
              });
          } else {
              // Existing user logic (same as before)
              const data = {
                  user: {
                      id: user.id
                  }
              }

              const authtoken = jwt.sign(data, JWT_SECRET);
              success = true;
              res.header('Cross-Origin-Opener-Policy', 'unsafe-none');
              res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
              res.json({
                  success,
                  authtoken,
                  email: user.email,
                  name: user.name,

                  signup
                  // Add more attributes as needed
              });
          }
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  }
});
// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password,occupation } = req.body;
  try {
    
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
        name: user.name 
      }
    }

    if (occupation) {
      
      user.occupation = occupation;
      await user.save();
    }
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken,occupation ,id: user.id,name: user.name })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.get('/alluserinfo',async(req,res) => {
  try {
    const alluserinfo = await User.find();
    res.send(alluserinfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Attempt to find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }

    // Generate a reset token that includes the user's ID
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: "deveshdiliprathi@gmail.com",
        pass: "sqxofcmuzklsaait" // Provide your email password here
      }
    });

    const resetPasswordLink = `http://localhost:3000/reset-password/${user._id}/${token}`;

    const mailOptions = {
      from: "deveshdiliprathi@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the following link to reset your password:</p><p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        console.log(`Email sent successfully!`, info.response);
        res.json({ success: true });
      } else {
        console.error(error.message);
        res.status(500).json({ error: "Failed to send the reset email" });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Verify the JWT token
    jwt.verify(token, JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.json({ Status: "Error with Token" });
      } else {
        // Hash the new password
        const hash = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        const updatedUser = await User.findByIdAndUpdate(
          { _id: id },
          { password: hash },
          { new: true } // Get the updated user object
        );

        if (!updatedUser) {
          return res.json({ Status: "Error updating password" });
        }

        res.send({ Status: "Success" });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Status: "Internal Server Error" });
  }
});

module.exports = router