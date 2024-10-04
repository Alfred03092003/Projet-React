const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); // Charger les variables d'environnement

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: 'destinataire@example.com', // Remplacez par un email valide
    subject: 'Test d\'envoi d\'email',
    text: 'Ceci est un test d\'envoi d\'email.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error("Erreur d'envoi d'email:", error);
    }
    console.log('Email envoyé:', info.response);
});
