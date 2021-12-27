const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res, next) => {
  fullName = req.body.fullName;
  email = req.body.email;
  phone = req.body.phone;
  message = req.body.message;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'wiley.crist51@ethereal.email',
      pass: 'YwPEm7acSKhykbPETj'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: req.body.email,
    to: 'gozver@gmail.com',
    subject: 'Musicnode client enquiry',
    text: message,
    html: `
      <h1>User information</h1>
      <ul>
        <li>User: ${fullName}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>Message: ${message}</li>
      </ul>
    `
  });
  
  console.log('--> message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('--> preview url: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  transporter.sendMail(info, (error, info) => {
    error 
      ? res.status(500).send(error.message)
      : res.status(200).send(info);
  });
}