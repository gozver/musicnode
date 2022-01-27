const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// NOTE: Disable avast before sending messages

// google API credentials
const CLIENT_ID = '567852569928-rbuthvpqilv3rir8dtk7v77ko02fcm0s.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04_DvccE9TzqfCgYIARAAGAQSNwF-L9IrQqos4R9LVjAgv2ymWDY9JpJEdf7DY37E7ZLtYEDvgjXavXleGVJtAuuHmpUS-FU6JwI';

// create our oauth2client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// set credencials on our oauth2client
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// controller to send contact emails
exports.sendContactEmail = async (req, res, next) => {
  fullName = req.body.name;
  email = req.body.email;
  phone = req.body.phone;
  message = req.body.message;

  try {
    // create access token
    const accessToken = await oAuth2Client.getAccessToken();

    // create a reusable transport object using the gmail api
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'gozver@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });    

    // set the email options (we don't use the sender email because doesn't exists)
    const mailOptions = {
      // from: email,
      from: 'gozver@gmail.com',
      to: 'gozver@gmail.com',
      subject: `Musicnode contact inquire from ${fullName}`,
      text: message,
      html: `
      <h3>User information</h3>
      <ul>
        <li>User: ${fullName}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${message}</p>
      `
    };
  
    // send the email (don't forget to disable the antivirus)
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        if (!err.statusCode) err.statusCode = 500;

        // print error and send it to error controller
        console.log('--> error:');
        console.log(err);
        next(err);
      } else {
        res.status(200).send(info);
      }
        
    });
  } catch(err) {
    if (!err.statusCode) err.statusCode = 500;

    // print error and send it to error controller
    console.log('--> error:');
    console.log(err);
    next(err);
  }

  // // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: 'wiley.crist51@ethereal.email',
  //     pass: 'YwPEm7acSKhykbPETj'
  //   },
  //   tls: {
  //     rejectUnauthorized: false
  //   }
  // });

  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: req.body.email,
  //   to: 'gozver@gmail.com',
  //   subject: 'Musicnode client enquiry',
  //   text: message,
  //   html: `
  //     <h1>User information</h1>
  //     <ul>
  //       <li>User: ${fullName}</li>
  //       <li>Email: ${email}</li>
  //       <li>Phone: ${phone}</li>
  //       <li>Message: ${message}</li>
  //     </ul>
  //   `
  // });
  
  // console.log('--> message sent: %s', info.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log('--> preview url: %s', nodemailer.getTestMessageUrl(info));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  // transporter.sendMail(info, (error, info) => {
  //   error 
  //     ? res.status(500).send(error.message)
  //     : res.status(200).send(info);
  // });
}