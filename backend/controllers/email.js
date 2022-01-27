const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('../config/config.json');

// NOTE: Disable avast before sending messages

// google API credentials
const CLIENT_ID = config.gmail.clientId;
const CLIENT_SECRET = config.gmail.clientSecret;
const REDIRECT_URI = config.gmail.redirectUrl;
const REFRESH_TOKEN = config.gmail.refreshToken;

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
}