import express from "express";
import { resend } from "../config/resend.js"; // On réutilise l'instance centralisée

const router = express.Router();

// 🛡️ Utils (Cohérence avec reservation.js)
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const sanitize = (str = "") => (typeof str === 'string' ? str.replace(/[<>]/g, "") : str);

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // 1. Validation de présence
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Nom, email et message sont requis." });
  }

  // 2. Validation format email
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: "Format d'email invalide." });
  }

  // 3. Sanitisation pour éviter les injections HTML
  const safe = {
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone),
    message: sanitize(message),
  };

  try {
    // 📧 UN SEUL ENVOI : Tout vers TOI (l'Admin)
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: ["gentlemenexcursions@gmail.com"], // Ton adresse vérifiée
      replyTo: safe.email, // Si tu cliques sur "Répondre", ça écrira au client
      subject: `📩  Nouvelle demande : ${safe.excursionTitle || 'Contact'}`,
      html: `
        <div style="font-family: sans-serif; border: 1px solid #ccc; padding: 20px; color: #333;">
          <h2 style="color: #1e40af;">Détails complets de la demande</h2>
          <hr />
          <p><strong>Nom du client :</strong> ${safe.name}</p>
          <p><strong>Email du client :</strong> ${safe.email}</p>
          <p><strong>Téléphone :</strong> ${safe.phone || "Non renseigné"}</p>
          ${safe.excursionTitle ? `<p><strong>Excursion :</strong> ${safe.excursionTitle}</p>` : ""}
          ${safe.date ? `<p><strong>Date :</strong> ${safe.date}</p>` : ""}
          ${safe.participants ? `<p><strong>Participants :</strong> ${safe.participants}</p>` : ""}
          <hr />
          <p><strong>Message :</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${safe.message || "<em>Aucun message laissé.</em>"}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Erreur Resend détaillée :", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ Email reçu par Resend. ID :", data.id);
    res.status(200).json({ success: true, message: "Demande bien reçue par l'admin" });

  } catch (err) {
    console.error("💥 Erreur critique serveur :", err);
    res.status(500).json({ error: "Erreur technique lors de l'envoi." });
  }
});

export default router;