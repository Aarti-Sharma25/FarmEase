
// import nodemailer from "nodemailer";

// // ❌ ye hata do (top-level pe createTransport mat karo)
// // export const transporter = nodemailer.createTransport({...});

// // ✅ isse replace karo
// export function getTransporter() {
//   return nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });
// }


import { BrevoClient } from '@getbrevo/brevo';

export function getBrevoClient() {
  return new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
  });
}

export const getSender = () => ({
  email: "aartisharmaindian25@gmail.com",
  name: "FarmEase",
});
