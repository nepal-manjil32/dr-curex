import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sunitsoni915@gmail.com',
      pass: 'sbxh unef kbvk jesx'
    }
  });

export default transporter;