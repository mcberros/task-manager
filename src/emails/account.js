const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'example@example.com',
    subject: 'Thanks for joining in',
    text: `Welcome to the app, ${name}.`
  })
}

const sendByeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'example@example.com',
    subject: 'Sorry to hear that you canceled',
    text: `Hi ${name}! We are sorry that you are leaving us.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendByeEmail
}
