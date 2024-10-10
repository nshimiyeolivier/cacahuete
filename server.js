// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route principale pour envoyer les e-mails
app.post('/send-emails', async (req, res) => {
    const { eventName, participants } = req.body;

    // Configurer Nodemailer avec un service d'envoi d'e-mails (ex: Gmail, SMTP)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kasimbafm@gmail.com', // Remplacez par votre email
            pass: 'grbawfcpwpoczyct' // Remplacez par votre mot de passe
        }
    });

    // Envoyer les e-mails aux participants
    try {
        for (let i = 0; i < participants.length; i++) {
            const giver = participants[i].giver;
            const receiver = participants[i].receiver;

            let mailOptions = {
                from: 'kasimbafm@gmail.com',
                to: giver.email, // Email du donneur
                subject: `Échange de cadeaux - ${eventName}`,
                text: `Bonjour ${giver.name},\n\nVous allez offrir un cadeau à: ${receiver.name}.\n\nBon échange de cadeaux!`
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email envoyé à ${giver.email}`);
        }

        res.status(200).json({ message: 'Emails envoyés avec succès!' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi des emails:', error);
        res.status(500).json({ message: 'Échec de l\'envoi des emails.' });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
