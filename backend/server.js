const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); // Charger les variables d'environnement

console.log("JWT Secret:", process.env.JWT_SECRET);
console.log("Email:", process.env.EMAIL);


const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projetstage"
})

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API utilisateurs !');
});

app.post('/signup', (req, res) => {
    const { nom, role, email, motdepasse } = req.body;

    // Hachage du mot de passe avant de l'enregistrer
    const hashedPassword = bcrypt.hashSync(motdepasse, 8);

    const sql = "INSERT INTO utilisateurs (nom, role, email, motdepasse) VALUES (?)";
    const values = [nom, role, email, hashedPassword];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Erreur SQL : ", err);
            return res.status(500).json("Erreur lors de l'insertion des données");
        }
        return res.status(200).json({ message: "Utilisateur ajouté avec succès !" });
    });
});

app.post('/login', (req, res) => {
    const { email, motdepasse } = req.body;
    const sql = "SELECT * FROM utilisateurs WHERE email = ?";

    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json("Erreur du serveur");
        }
        if (result.length > 0) {
            const user = result[0];
            const isPasswordValid = bcrypt.compareSync(motdepasse, user.motdepasse);

            if (isPasswordValid) {
                return res.status(200).json({ message: "Connexion réussie", user });
            } else {
                return res.status(401).json("Mot de passe incorrect");
            }
        } else {
            return res.status(404).json("Utilisateur non trouvé");
        }
    });
});

// Endpoint pour demander un mot de passe oublié
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    const sql = "SELECT * FROM utilisateurs WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json("Erreur du serveur");
        }
        if (result.length === 0) {
            return res.status(404).json("Utilisateur non trouvé");
        }

        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `http://localhost:3000/reset-password/${token}`; // Changez cette URL selon vos besoins

        // Configurer le transporteur Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Demande de réinitialisation de mot de passe',
            text: `Cliquez sur le lien pour réinitialiser votre mot de passe : ${resetLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Erreur d'envoi d'email:", error); // Affichez l'erreur dans la console
                return res.status(500).json("Erreur lors de l'envoi de l'email");
            }
            res.json({ message: "Un email a été envoyé avec un lien pour réinitialiser votre mot de passe." });
        });        
    });
});

// Endpoint pour réinitialiser le mot de passe
app.post('/reset-password', (req, res) => {
    const { token, newPassword } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json("Token invalide ou expiré");
        }

        const { email } = decoded;
        const hashedPassword = bcrypt.hashSync(newPassword, 8);

        const sql = "UPDATE utilisateurs SET motdepasse = ? WHERE email = ?";
        db.query(sql, [hashedPassword, email], (err, result) => {
            if (err) {
                return res.status(500).json("Erreur du serveur");
            }
            if (result.affectedRows === 0) {
                return res.status(404).json("Utilisateur non trouvé");
            }
            res.json({ message: "Mot de passe réinitialisé avec succès." });
        });
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
