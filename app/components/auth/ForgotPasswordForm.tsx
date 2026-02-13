'use client';

import { Mail } from "lucide-react";
import { useState } from "react";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

// 🔗 backend (usa query param ?email=)
import { accountRecoveryApi } from "@/infracstructure/services/features/auth/auth.api";
// 🧼 sanitizado + bloqueo sin cambiar tu UI
import { sanitizeEmail, DISALLOWED_EMAIL, attachGuards } from "@/app/lib/sanitize";

interface ForgotPasswordFormProps {
  setFormView: (view: 'login' | 'register' | 'forgotPassword') => void;
}

export default function ForgotPasswordForm({ setFormView }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return toast.error("Por favor, introduce un correo válido.");
    }
    try {
      setSubmitting(true);
      await accountRecoveryApi({ email });
      toast.success("Si el correo existe, te enviamos un enlace de recuperación.");
      setFormView('login');
    } catch (error: unknown) {
      const message = (error as Error).message || "No pudimos procesar la recuperación.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const animation = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.3 }
  };

  return (
    <motion.section {...animation} className="flex flex-col gap-10">
      <div>
        <h2 className="text-2xl md:text-4xl 2xl:text-[44px] text-green font-bold text-center">
          Recuperar contraseña
        </h2>
        <p className="text-black text-center text-base md:text-lg 2xl:text-xl">
          Ingresa tu correo y te enviaremos un enlace.
        </p>
      </div>
      <form className="flex flex-col items-center gap-8 text-black w-full" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <label className="text-black text-sm 2xl:text-base" htmlFor="email-forgot">Correo electrónico</label>
          <Mail size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
          <input
            className="w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium 2xl:text-lg py-2 pl-10"
            type="email"
            id="email-forgot"
            name="email"
            value={email}
            onChange={(e) => setEmail(sanitizeEmail(e.target.value))}
            required
            // ⛔️ bloquea < > y cualquier char fuera del allow-list de email
            ref={(el) => { attachGuards(el, sanitizeEmail, DISALLOWED_EMAIL); }}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-green py-2.5 px-16 w-fit rounded-full text-white font-medium text-base 2xl:text-lg cursor-pointer hover:bg-opacity-90 transition-transform active:scale-95"
        >
          Enviar enlace
        </button>
        <span className="text-sm md:text-base">
          ¿Ya la recordaste?&nbsp;
          <button
            type="button"
            onClick={() => setFormView('login')}
            className="font-semibold text-blue text-sm md:text-base cursor-pointer"
          >
            Inicia sesión
          </button>
        </span>
      </form>
    </motion.section>
  );
}
