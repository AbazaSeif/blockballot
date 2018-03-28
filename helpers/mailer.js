const nodemailer = require('nodemailer');
const env = require('dotenv').config();
const helpers = require('../helpers/helpers.js');
const dbHelper = require('../database/dbHelpers.js');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, 
  auth: {
      user: 'blockballot@gmail.com', 
      pass: process.env.PASSWORD 
  }
});

const sendPasswordReset = function(email, callback) {
  let mailPasswordOptions = {
      from: '"BlockBallot" <blockballot@gmail.com>', 
      to: `${email}`, 
      subject: 'Link to reset your password', 
      html: '<b>Click the link below to reset your password.</b>' 
  };

  transporter.sendMail(mailPasswordOptions, (error, info) => {
    if (error) {
      callback(error);
    } else {
      console.log('no error');
      callback(null, info);
    }
  });
}

const sendEmailCodes = (emails, pollId, callback) => {
  emails.forEach((recipient) => {
    let code = helpers.createUniqueId();

    let emailCodeOptions = {
      from: '"BlockBallot" <blockballot@gmail.com>', 
      to: `${recipient}`, 
      subject: 'Your voting code', 
      html: '<p>Visit localhost:3000/voter and enter the code below to submit your vote.</p><p>Your unique code is <b>' + `${code}` + '</b></p>' 
    };

    dbHelper.saveVoterID(code, pollId);
    transporter.sendMail(emailCodeOptions, (error, info) => {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    });
  })
}

exports.sendPasswordReset = sendPasswordReset;
exports.sendEmailCodes = sendEmailCodes;
