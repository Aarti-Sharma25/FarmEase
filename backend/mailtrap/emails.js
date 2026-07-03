import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { getBrevoClient, getSender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const brevo = getBrevoClient();
    const sender = getSender();

    try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
            subject: "Welcome to FarmEase - Please Verify Your Email",
            htmlContent: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            sender: { name: sender.name, email: sender.email },
            to: [{ email: email }],
        });
        console.log("Verification email sent successfully", response);
    } catch (error) {
        console.error("Error sending verification email", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const brevo = getBrevoClient();
    const sender = getSender();

    try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
            subject: "Welcome to FarmEase - Let's Grow Together!",
            htmlContent: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2E7D32;">Welcome to FarmEase, ${name}!</h2>
                    <p>We're thrilled to have you join our community where farmers help each other grow.</p>
                    <p>At FarmEase, you can:</p>
                    <ul>
                        <li>📦 Rent equipment when you need it</li>
                        <li>💰 Earn from idle equipment</li>
                        <li>⏱ Save time and resources</li>
                    </ul>
                    <p>We're here to make farm equipment sharing simple and rewarding. If you have any questions or need assistance, our support team is always ready to help.</p>
                    <p>Happy Farming,<br><strong>The FarmEase Team</strong></p>
                    <p style="font-size: 0.9em; color: #757575;">"Cultivating connections, growing possibilities"</p>
                </div>
            `,
            sender: { name: sender.name, email: sender.email },
            to: [{ email: email }],
        });
        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const brevo = getBrevoClient();
    const sender = getSender();

    try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
            subject: "FarmEase - Reset Your Password",
            htmlContent: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            sender: { name: sender.name, email: sender.email },
            to: [{ email: email }],
        });
        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset email", error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const brevo = getBrevoClient();
    const sender = getSender();

    try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
            subject: "FarmEase - Password Updated Successfully",
            htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE,
            sender: { name: sender.name, email: sender.email },
            to: [{ email: email }],
        });
        console.log("Password reset success email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset success email", error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};