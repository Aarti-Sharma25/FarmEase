
// import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
// import { transporter, sender } from "./mailtrap.config.js";

// export const sendVerificationEmail = async (email, verificationToken) => {
//     const mailOptions = {
//         from: sender,
//         to: email,
//         subject: "Verify your Email",
//         html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
//     };

//     try {
//         const response = await transporter.sendMail(mailOptions);
//         console.log("Email sent successfully", response);
//     } catch (error) {
//         console.error(`Error sending verification email`, error);
//         throw new Error(`Error sending verification email: ${error}`);
//     }
// };

// export const sendWelcomeEmail = async (email, name) => {
//     const mailOptions = {
//         from: sender,
//         to: email,
//         subject: "Welcome!",
//         html: `<p>Hello ${name},</p><p>Welcome to FarmSpace !</p>`, 
//     };

//     try {
//         const response = await transporter.sendMail(mailOptions);
//         console.log("Welcome email sent successfully", response);
//     } catch (error) {
//         console.error(`Error sending welcome email`, error);
//         throw new Error(`Error sending welcome email: ${error}`);
//     }
// };

// export const sendPasswordResetEmail = async (email, resetURL) => {
//     const mailOptions = {
//         from: sender,
//         to: email,
//         subject: "Reset your password",
//         html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
//     };

//     try {
//         const response = await transporter.sendMail(mailOptions);
//         console.log("Password reset email sent successfully", response);
//     } catch (error) {
//         console.error(`Error sending password reset email`, error);
//         throw new Error(`Error sending password reset email: ${error}`);
//     }
// };

// export const sendResetSuccessEmail = async (email) => {
//     const mailOptions = {
//         from: sender,
//         to: email,
//         subject: "Password Reset Successfully",
//         html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//     };

//     try {
//         const response = await transporter.sendMail(mailOptions);
//         console.log("Password reset success email sent successfully", response);
//     } catch (error) {
//         console.error(`Error sending password reset success email`, error);
//         throw new Error(`Error sending password reset success email: ${error}`);
//     }
// };


// // for dotenv file 

// // SMTP_HOST=smtp.gmail.com
// // SMTP_PORT=587
// // SMTP_USER=your_email@gmail.com
// // SMTP_PASS=your_email_password




import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { transporter, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: "Welcome to FarmEase - Please Verify Your Email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully", response);
    } catch (error) {
        console.error("Error sending verification email", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: "Welcome to FarmEase - Let's Grow Together!",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2E7D32;">Welcome to FarmEase, ${name}!</h2>
                <p>We're thrilled to have you join our community where farmers help each other grow.</p>
                
                <p>At FarmEase, you can:</p>
                <ul>
                    <li>📦 Rent equipment when you need it</li>
                    <li>💰 Earn from idle equipment</li>
                    <li>⏱ Save time and resources</li>
                </ul>
                
                <p>We're here to make farm equipment sharing simple and rewarding. If you have any questions or need assistance, 
                our support team is always ready to help.</p>
                
                <p>Happy Farming,<br>
                <strong>The FarmEase Team</strong></p>
                
                <p style="font-size: 0.9em; color: #757575;">
                    "Cultivating connections, growing possibilities"
                </p>
            </div>
        `, 
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: "FarmEase - Reset Your Password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset email", error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: "FarmEase - Password Updated Successfully",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("Password reset success email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset success email", error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};
