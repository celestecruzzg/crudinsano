'use client';

import { Eye, EyeClosed, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// === añadidos mínimos (sin tocar diseño) ===
import { loginApi } from "@/infracstructure/services/features/auth/auth.api";
import { setSessionFromAuthResult } from "@/infracstructure/services/session";
import {
  sanitizeEmail,
  sanitizePassword,
  DISALLOWED_EMAIL,
  DISALLOWED_PASSWORD,
  attachGuards, // lo exportamos desde app/lib/sanitize.ts como acordamos
} from "@/app/lib/sanitize";

interface AuthFormProps {
  setFormView: (view: 'login' | 'register' | 'forgotPassword') => void;
}

export default function AuthForm({ setFormView }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // sanitiza SIN cambiar tu UI
    const clean =
      name === "email" ? sanitizeEmail(value) :
        name === "password" ? sanitizePassword(value) :
          value;

    setFormData(prev => ({ ...prev, [name]: clean }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    // --- VALIDACIONES (mismas que tenías) ---
    if (!formData.email || !formData.password) {
      return toast.error("Por favor, completa todos los campos.");
    }
    if (!validateEmail(formData.email)) {
      return toast.error("Por favor, introduce un correo válido.");
    }
    if (formData.password.length < 6) {
      return toast.error("La contraseña debe tener al menos 6 caracteres.");
    }

    try {
      setSubmitting(true);
      // --- LOGIN real contra tu backend ---
      const res = await loginApi({ email: formData.email, password: formData.password });

      // guarda tokens + user y redirige
      setSessionFromAuthResult(res);
      toast.success(`¡Inicio de sesión exitoso!`);
      router.replace("/dashboard");
    } catch (error: unknown) {
      const message = (error as Error).message || "No pudimos iniciar sesión.";
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
          ¡Bienvenido de vuelta!
        </h2>

        <p className="text-black text-center text-base md:text-lg 2xl:text-xl">
          Ingresa tus credenciales para tener acceso.
        </p>
      </div>

      <form className="flex flex-col items-center gap-8 text-black w-full" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <label className="text-black text-sm 2xl:text-base" htmlFor="email">Correo electrónico</label>
          <Mail size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
          <input
            className="w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium 2xl:text-lg py-2 pl-10"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            // bloqueo DURO de < > y cualquier char fuera del allow-list email
            ref={(el) => { attachGuards(el, sanitizeEmail, DISALLOWED_EMAIL); }}
          />
        </div>

        <div className="w-full relative">
          <label className="text-black text-sm 2xl:text-base" htmlFor="password">Contraseña</label>
          <KeyRound size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
          <input
            className="w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium 2xl:text-lg py-2 pl-10 pr-10"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            // bloqueo DURO de < > y controles para password
            ref={(el) => { attachGuards(el, sanitizePassword, DISALLOWED_PASSWORD); }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-2.5 right-2 cursor-pointer"
          >
            {showPassword ? <Eye size={20} className="text-green" /> : <EyeClosed size={20} className="text-green" />}
          </button>
        </div>

        <div className="flex justify-end w-full">
          <button type="button" onClick={() => setFormView('forgotPassword')} className="text-sm md:text-base font-semibold text-blue text-right cursor-pointer">
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-green py-2.5 px-16 w-fit rounded-full text-white font-medium text-base 2xl:text-lg cursor-pointer hover:bg-opacity-90 transition-transform active:scale-95 disabled:opacity-60"
        >
          Ingresar
        </button>

        <span className="text-center text-sm md:text-base">
          ¿Aún no tienes una cuenta?&nbsp;
          <button type="button" onClick={() => setFormView('register')} className="font-semibold text-blue text-sm md:text-base cursor-pointer">
            Registrate
          </button>
        </span>
      </form>
    </motion.section>
  );
}
