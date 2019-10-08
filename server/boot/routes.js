'use strict';
/**
 * https://docs.aws.amazon.com/en_us/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
 * */

const {
  AWSSESKEYID,
  AWSSESKEYSECRET,
  AWSSESREGION,
} = process.env;

const aws = require('aws-sdk');

const ses = new aws.SES({
  credentials: {
    accessKeyId: AWSSESKEYID,
    secretAccessKey: AWSSESKEYSECRET,
  },
  region: AWSSESREGION,
});

const TO_ADDRESS = 'support@walk.in';
const bodyDefaults = { Charset: 'UTF-8' };

module.exports = function bootRoutes(app) {
  app.post('/api/support',  function supportHandler(req, res) {
    if (!AWSSESKEYID || !AWSSESKEYSECRET || !AWSSESREGION) {
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

    const params = {
      Source: TO_ADDRESS,
      Destination: {
        ToAddresses: [
          TO_ADDRESS,
        ],
      },
      Message: {
        Body: {
          Html: { Data: text, ...bodyDefaults },
          Text: { Data: text, ...bodyDefaults },
        },
        Subject: { Data: `Support: ${subject}`, ...bodyDefaults },
      },
      ReplyToAddresses: [
        email,
      ],
    };

    ses.sendEmail(params).promise().then(() => {
      res.send('sent');
    })
      .catch(err => {
        res.status(500).send(err.message);
      });
  });
};
