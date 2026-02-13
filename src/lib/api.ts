import axios from "axios";
import CryptoJS from "crypto-js";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const timestamp = Date.now().toString();
  const secret = process.env.NEXT_PUBLIC_API_SECRET || "default_secret";

  // Construir el payload a firmar: MÉTODO + RUTA + TIMESTAMP + DATA(si existe)
  // Ejemplo: POST/users1765876543{"nombre":"..."}
  const method = config.method?.toUpperCase() || "";
  const url = config.url || "";
  const dataString = config.data ? JSON.stringify(config.data) : "";

  const payloadToSign = `${method}${url}${timestamp}${dataString}`;

  const signature = CryptoJS.HmacSHA256(payloadToSign, secret).toString();

  config.headers["x-timestamp"] = timestamp;
  config.headers["x-signature"] = signature;

  return config;
});
