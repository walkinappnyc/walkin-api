'use strcit';

const util = require('util');
const nodemailer = require('nodemailer');

const {
  NODEMAILER_USER,
  NODEMAILER_PASS,
  NODEMAILER_RECEIVER,
} = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

const sendMail = util.promisify(transporter.sendMail).bind(transporter);

module.exports = function bootRoutes(app) {
  app.post('/api/support',  function supportHandler(req, res) {
    if (!NODEMAILER_PASS || !NODEMAILER_USER) {
      return res.status(500).send('Sending emails not activated');
    }

    const {
      email, subject, text,
    } = req.body || {};

    if (email == null) {
      return res.status(400).send('Email required');
    }

    if (subject == null) {
      return res.status(400).send('Subject required');
    }

    if (text == null) {
      return res.status(400).send('Text required');
    }

    console.log('CREDS:',
      NODEMAILER_USER, NODEMAILER_RECEIVER, NODEMAILER_PASS);

    sendMail({
      from: NODEMAILER_USER,
      to: (NODEMAILER_RECEIVER || NODEMAILER_USER),
      replyTo: email,
      subject,
      text,
    }).then(() => {
      res.send('sent');
    })
      .catch(err => {
        res.status(500).send(err.message);
      });
  });
};
