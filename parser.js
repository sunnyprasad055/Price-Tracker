require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const nightmare = require('nightmare')()




const arguments = process.argv.slice(2)
const url = arguments[0]
minPrice = arguments[1]


checkPrice()


async function checkPrice() {
  const priceString = await nightmare.goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end()
  const priceNumber = parseFloat(priceString.replace('₹', ''))
  if (priceNumber < minPrice) {
    sendEmail(
      'price is low',
      `The price on ${url} has dropped to ${minPrice}`
    )
  }
}

function sendEmail(subject, body) {
  const email = {
    to: "sunnyprasad055@gmail.com",
    from: "Price-checker-project@example.com",
    subject: subject,
    text: body,
    html: body
  }
  return sgMail.send(email)
}

// https://www.amazon.in/iSteady-X2-3-Axis-Stabilizer-Smartphone/dp/B091T2LN9V/ref=sr_1_2_sspa?crid=RAJ6E29L8P28&dchild=1&keywords=mobile+gimble+360+rotation&qid=1629439360&sprefix=mobile+gimble%2Caps%2C299&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyNTlDSDM4UlMxVVkyJmVuY3J5cHRlZElkPUEwOTkwNDQ2SE1SSFZYUE1PNkJTJmVuY3J5cHRlZEFkSWQ9QTAwNjQ5MDVZVjhHMUxKVUhDWkImd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl
// 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