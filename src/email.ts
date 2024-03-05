import nodemailer from 'nodemailer';
import axios from 'axios';

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.BREVO_SMTP_KEY,
    },
});

export async function sendEmail(replyToName: string, replyToEmail: string, message: string) {
    const url = "https://api.brevo.com/v3/smtp/email"
    const headers = {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
    }
    const data = {
        sender: {
            name: "Portfolio Website",
            email: "andrew.bezold@gmail.com",
        },
        to: [
            {
                name: "Andrew Bezold",
                email: "andrew.bezold@gmail.com",
            },
        ],
        replyTo: {
            name: replyToName,
            email: replyToEmail,
        },
        subject: "Message",
        textContent: message,
        htmlContent: message,
    }
    await axios.post(url, data, {headers: headers});
};
