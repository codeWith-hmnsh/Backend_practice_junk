import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com"
    }
  });

  // Generate the plaintext version
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  // Generate the HTML version (renamed variable to avoid error)
  const emailHtml = mailGenerator.generate(options.mailgenContent);
  
  // Next steps: Use a transporter (like Nodemailer) to send emailHtml and emailTextual
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: process.env.MAILTRAP_SMTP_PORT,
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass: process.env.MAILTRAP_SMTP_PASS
  }
})

const mail = {
  from: "mail.taskmanager@example.com",
  to: options.email,
  subject: options.subject,
  text: emailTextual,
  html: emailHtml
};

try {
  await transporter.sendMail(mail);
} catch (error) {
console.error("Email service failed silently. Make sure that you have provided your MAILTRAP credentials in the .env file")
console.error("Error: ", error)

}

}


const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! we'are excited to have you on board.",
            action: {
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "#22BC66", // Added a standard green color
                    text: "Verify your account",
                    link: verificationUrl
                },
            },
            outro:
            "Need help,or have questions ? just reply to this email, we'd love to help.",
        },
    };
};

const forgotPasswordMailgenContent = (username,passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "we got a request to reset the password of your account",
            action: {
                instructions: "To reset your password click on the following button or link ",
                button: {
                    color: "#22BC66", // Added a standard green color
                    text: "Reset Password",
                    link: verificationUrl
                },
            },
            outro:
            "Need help,or have questions ? just reply to this email, we'd love to help.",
        },
    };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};