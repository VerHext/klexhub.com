import axios from 'axios'
var AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_MYAPP,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MYAPP,
  region: process.env.AWS_REGION_MYAPP,
  // (...)
})
// Set the region
AWS.config.update({ region: 'eu-west-1' })

// Receive the submittet form of a new angebot
export default function submitAngebot(req, res) {
  axios
    .post(
      'https://discord.com/api/webhooks/810833628971532290/8hozTRL191Z1mZjWrV82GYGZUjSbegL6Eeg4YXLWZeB886XD8e1kznlG7nQ71Zhzozyz',
      { content: '<@268368233935929344> Neues Angebot: ```' + JSON.stringify(req?.body) + '```' }
    )
    .catch(() => console.log('failed to send webhook discord ', JSON.stringify(req?.body)))
    .then(() => console.log('new angebot ', JSON.stringify(req?.body)))

  try {
    sendEmail(req)
  } catch (e) {}
  try {
    sendIncommingPassEmail(req)
  } catch (e) {}
  res.status(200).json({ oke: true })
}

const sendEmail = (req) => {
  var params = {
    Destination: {
      ToAddresses: ['j.waigel@klexhub.com'],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Text: {
          Charset: 'UTF-8',
          Data: 'Neues Angebot: ' + JSON.stringify(req?.body),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Neues Angebot',
      },
    },
    Source: 'Angebote-incomming-KlexHub-9445<no-reply@klexhub.com>' /* required */,
    ReplyToAddresses: [
      'support@klexhub.com',
      /* more items */
    ],
  }

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise()

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function (data) {
      console.log(data.MessageId)
    })
    .catch(function (err) {
      console.error(err, err.stack)
    })
}

const sendIncommingPassEmail = (req) => {
  console.log('df')
  const data = req?.body
  console.log('EMAIL :: ' + data?.email)
  var params = {
    Destination: {
      ToAddresses: [data?.email],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Text: {
          Charset: 'UTF-8',
          Data: `Vielen Dank für Ihre Interesse an unserem Unternehmen!\nWir möchten den Eingang Ihrer unverbindlichen Angebotsanfrage hiermit bestätigen.\n Wir melden uns schnellsmöglichst bei Ihnen! Bis dahin wünschen wir Ihnen alles gute!\n\n Viele Grüße\n\n KlexHub Team`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Vielen Dank für Ihre Angebotsanfrage.',
      },
    },
    Source: 'KlexHub UG<no-reply@klexhub.com>',
    ReplyToAddresses: ['support@klexhub.com'],
  }

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise()

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function (data) {
      console.log(data.MessageId)
    })
    .catch(function (err) {
      console.error(err, err.stack)
    })
}
