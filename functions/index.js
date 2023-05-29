/**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
// const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
// const SENDGRID_API_KEY =functions.config().sendgrid.key
const TEMPLATE_ID = "d-476fa89301fb4a39b78cfa15930a6fb5";
// replace with your actual SendGrid API key

sgMail.setApiKey(functions.config().sendgrid.key);

// admin.initializeApp();

exports.sendEmail = functions.https.onCall(async (data, context) => {
  // const { to, subject, message } = data;

  const dynamicTemplateData = {
    origin: data.origin,
    destination: data.destination,
    date: data.date,
    hour: data.hour,
    seat: data.seat,
  };

  const msg = {
    to: data.to,
    from: data.from,
    templateId: TEMPLATE_ID,
    dynamic_template_data: dynamicTemplateData,
  };

  try {
    await sgMail.send(msg);
    return {success: true};
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }

    return {success: false};
  }
});
