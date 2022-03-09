const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transpoter
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define a small options
  const mailOptions = {
    from: 'Minh Duc Vu <mduc152001@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send a email
  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
