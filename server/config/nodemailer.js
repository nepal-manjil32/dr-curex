import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com',
//     port: 587,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS
//     }
// })

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dhimalprashant25@gmail.com',
      pass: 'micn lbpp zqrv qouf'
    }
  });

export default transporter;