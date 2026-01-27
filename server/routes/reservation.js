import express from "express";
import { resend } from "../config/resend.js";

const router = express.Router();

// 🛡️ Utils
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const sanitize = (str = "") => (typeof str === 'string' ? str.replace(/[<>]/g, "") : str);

// 🌍 Templates CLIENT (Optimisés)
const clientTemplates = {
  fr: ({ name, excursionTitle, date, participants }) => ({
    subject: `Confirmation de votre demande : ${excursionTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #1e40af;">Salama ${name} !</h2>
        <p>Nous avons bien reçu votre demande de réservation pour l'excursion <strong>${excursionTitle}</strong>.</p>
        <p><strong>Détails :</strong> Date : ${date} | Participants : ${participants}</p>
        <p>Notre équipe vous recontactera sous 24h pour finaliser les détails.</p>
        <p>Merci de votre confiance,<br><strong>L'équipe Gentlemen Excursions</strong></p>
      </div>
    `
  }),
  en: ({ name, excursionTitle, date, participants }) => ({
    subject: `Booking request confirmation: ${excursionTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #1e40af;">Hello ${name}!</h2>
        <p>We have received your booking request for the <strong>${excursionTitle}</strong> excursion.</p>
        <p><strong>Details:</strong> Date: ${date} | People: ${participants}</p>
        <p>Our team will contact you within 24 hours to finalize the details.</p>
        <p>Thank you for your trust,<br><strong>The Gentlemen Excursions Team</strong></p>
      </div>
    `
  }),
};

router.post("/", async (req, res) => {
  const { name, email, phone, date, participants, message, excursionTitle, language = "fr" } = req.body;

  if (!name || !email || !date || !participants || !excursionTitle) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email invalide" });
  }

  const safe = {
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone),
    date: sanitize(date),
    participants: participants, 
    message: sanitize(message),
    excursionTitle: sanitize(excursionTitle),
  };

  try {
    const template = clientTemplates[language] || clientTemplates.fr;

    await Promise.all([
      // 📧 EMAIL ADMIN (Affiche TOUTES les infos maintenant)
      resend.emails.send({
        from:"onboarding@resend.dev",
        to: ["gentlemenexcursions@gmail.com"],
        replyTo: safe.email,
        subject: `📩 Nouvelle réservation : ${safe.excursionTitle}`,
        html: `
          <div style="font-family: sans-serif; border: 1px solid #ccc; padding: 20px;">
            <h2 style="color: #1e40af;">Nouvelle demande de réservation</h2>
            <p><strong>Excursion :</strong> ${safe.excursionTitle}</p>
            <p><strong>Client :</strong> ${safe.name}</p>
            <p><strong>Email :</strong> ${safe.email}</p>
            <p><strong>Téléphone :</strong> ${safe.phone || "Non renseigné"}</p>
            <p><strong>Date prévue :</strong> ${safe.date}</p>
            <p><strong>Nombre de personnes :</strong> ${safe.participants}</p>
            <hr />
            <p><strong>Message du client :</strong></p>
            <p style="background: #f9f9f9; padding: 10px;">${safe.message || "Aucun message."}</p>
          </div>
        `,
      }),
      // 📧 EMAIL CLIENT (Confirmation)
      resend.emails.send({
        from: process.env.MAIL_FROM || "onboarding@resend.dev",
        to: [safe.email],
        ...template(safe),
      })
    ]);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("💥 Erreur Resend:", error);
    res.status(500).json({ error: "Erreur lors de l'envoi des emails" });
  }
});

export default router;