
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();
// console.log("SMTP_HOST:", process.env.SMTP_HOST, "PORT:", process.env.SMTP_PORT);

// // export const transporter = nodemailer.createTransport({
// //   host: process.env.SMTP_HOST, 
// //   port: process.env.SMTP_PORT,
// //   auth: {
// //     user: process.env.SMTP_USER, 
// //     pass: process.env.SMTP_PASS, 
// //   },
// // });
// export const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: false, // important
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// export const sender = {
//   email: process.env.SMTP_USER, 
//   name: "FarmEase", 
// };
import nodemailer from "nodemailer";

// ❌ ye hata do (top-level pe createTransport mat karo)
// export const transporter = nodemailer.createTransport({...});

// ✅ isse replace karo
export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export const getSender = () => ({
  email: process.env.SMTP_USER,
  name: "FarmEase",
});

