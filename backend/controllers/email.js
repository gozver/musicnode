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
  const { name, email, phone, message, band } = req.body;

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

    // set email params depending on whether the contact request is made from 'contact' or 'home'
    const from = 'gozver@gmail.com';
    const to = 'gozver@gmail.com';
    // const to = band ? band.email : email;
    const subject = band ? `${band.name} has a budget request from ${name}` : `Musicnode contact inquire from ${name}`;

    // set email options ('from' and 'to' fields are set to 'gozver@gmail.com beause emails from musicnode app aren't real)
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: message,
      html: `
        <h3>User information</h3>
        <ul>
          <li>User: ${name}</li>
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