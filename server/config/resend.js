// server/config/resend.js
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// On crée une seule instance exportable
export const resend = new Resend(process.env.RESEND_API_KEY);