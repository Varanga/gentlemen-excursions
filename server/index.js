// 🔥 Charger dotenv au plus tôt
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cors from "cors";

// Import des routes
import reservationRoutes from "./routes/reservation.js";
import contactRoutes from "./routes/contact.js";

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use("/api/reservation", reservationRoutes);
app.use("/api/contact", contactRoutes);

// --- GESTION DES ERREURS (Important !) ---

// 1. Route 404 - Si aucune route ne correspond
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route non trouvée" });
});

// 2. Middleware d'erreur Global - Capture les erreurs dans tes fichiers routes
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]:", err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Une erreur interne est survenue",
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

const PORT = process.env.PORT || 5000; // Utilise le port du .env s'il existe

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});