const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Nodemailer configuration for Mercury Mail
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 25, // Mercury Mail default SMTP port
  secure: false, // Set to true if using SSL/TLS
  ignoreTLS: true, // Set to true if Mercury Mail does not support STARTTLS
});

// Express route to send email
app.get('/send-email', async (req, res) => {
  const mailOptions = {
    from: 'test@localhost',
    to: 'postmaster@localhost',
    subject: 'To Postmaster dickhead',
    text: 'This is a test email from your Express.js app to Mercury Mail.',
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent: ' + info.response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
