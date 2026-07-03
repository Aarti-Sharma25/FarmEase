
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

// export const getSender = () => ({
//   email: process.env.SMTP_USER,
//   name: "FarmEase",
// });
import { Resend } from "resend";

export function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

export const getSender = () => ({
  email: "onboarding@resend.dev",
  name: "FarmEase",
});

