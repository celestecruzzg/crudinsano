'use client';

import { User, Mail, KeyRound, Eye, EyeClosed, CheckCircle2, XCircle, ArrowLeft, Cake, Ruler, Weight, VenusAndMars, ChevronDown } from "lucide-react";
import { useState } from "react";
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import { warningToast } from '../ui/toastCustom/WarningToast';
import axios from "axios";
import { registerApi } from "@/infracstructure/services/features/auth/auth.api";
import {
  sanitizeName,
  sanitizeEmail,
  sanitizePassword,
  DISALLOWED_NAME,
  DISALLOWED_EMAIL,
  DISALLOWED_PASSWORD,
  attachGuards,
} from "@/app/lib/sanitize";

interface RegisterFormProps {
  setFormView: (view: 'login' | 'register' | 'forgotPassword') => void;
}

const baseURL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

export default function RegisterForm({ setFormView }: RegisterFormProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailTaken, setEmailTaken] = useState<boolean | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    height: "",
    weight: "",
    gender: "",  //! importante: 0 = femenino, 1 = masculino, 2 = otro xd
    birthDate: "" // se deja por si las moscas
  });

  //no me juzguen la consulta, no le sé a redux pa
  async function probeEmailExists(email: string): Promise<boolean> {
    if (!email) return false;

    try {
      const res = await axios.post(
        `${baseURL}/api/auth/login`,
        { email, password: "__probe__" },
        { headers: { "Content-Type": "application/json", Accept: "application/json" }, withCredentials: false }
      );
      return !!res?.data;
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status?: number;
          data?: {
            title?: string | number;
            type?: string | number;
            detail?: string | number;
            code?: string | number;
            errors?: { code?: string | number }[];
          };
        };
      };
      const status = err?.response?.status;
      const data = err?.response?.data;

      if (status === 404) return false;

      if (status === 401) {
        const title = (data?.title ?? "").toString().toLowerCase();
        const type = (data?.type ?? "").toString().toLowerCase();
        const detail = (data?.detail ?? "").toString().toLowerCase();
        const code =
          (data?.errors?.[0]?.code ?? data?.code ?? "").toString().toLowerCase();

        const hints = `${title} ${type} ${detail} ${code}`;
        if (hints.includes("invalidcredentials") || hints.includes("invalid credentials")) {
          return true;
        }
        return false;
      }
      return false;
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const clean =
      name === "firstName" || name === "lastName" ? sanitizeName(value) :
        name === "email" ? sanitizeEmail(value) :
          name === "password" ? sanitizePassword(value) :
            value;

    setFormData(prev => ({ ...prev, [name]: clean }));

    if (name === "email") {
      setEmailTaken(null);
    }
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasNumber = (str: string) => /\d/.test(str);

  //puros ifs anidados paps
  const handleNextStep = async () => {
    const { firstName, lastName, email, password } = formData;
    if (!firstName || !lastName || !email || !password) {
      return toast.error("Todos los campos del primer paso son obligatorios.");
    }
    if (!validateEmail(email)) {
      return toast.error("El correo electrónico no es válido.");
    }
    if (password.length < 8) {
      return toast.error("La contraseña debe tener al menos 8 caracteres.");
    }
    if (!hasNumber(password)) {
      return toast.error("La contraseña debe contener al menos un número.");
    }

    if (emailTaken === true) {
      toast.error("Este correo ya está registrado.");
      return;
    }

    if (emailTaken === null) {
      try {
        setCheckingEmail(true);
        const exists = await probeEmailExists(email);
        setEmailTaken(exists);
        if (exists) {
          toast.error("Este correo ya está registrado.");
          return; // bloquea avance
        }
      } catch {
        toast.error("No pudimos verificar el correo. Intenta nuevamente.");
        return;
      } finally {
        setCheckingEmail(false);
      }
    }

    // mientras todo jale, y no hayan datos ya registrados, se pasa a la fase 2 del registro
    setStep(2);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { height, weight, gender, birthDate } = formData;
    if (!height || !weight || !gender || !birthDate) {
      return warningToast("Por favor, completa todos los campos del segundo paso.");
    }


    const ln = formData.lastName.trim();
    const parts = ln.split(/\s+/, 2);
    const firstLastName = parts[0] ?? ln;
    //no estamos pasando el ap materno pq no estaba en el figma y se iba a ver feito xd
    const secondLastName = parts.length > 1 ? parts[1] : ln;
    const genre =
      formData.gender === "Femenino" ? 0 :
        formData.gender === "Masculino" ? 1 : 2;

    const payload = {
      Name: formData.firstName,
      FirstLastName: firstLastName,
      SecondLastName: secondLastName,
      Email: formData.email,
      Password: formData.password,
      Genre: genre as 0 | 1 | 2,
      Weight: Number(formData.weight),
      Height: Number(formData.height),
      // ver al inicio del codigo por si no se sabe pq q chucha aqui
    };

    try {
      await registerApi(payload);
      toast.success("¡Registro exitoso! Ahora inicia sesión.");
      setFormView('login');
    } catch (error: unknown) {
      const message = (error as Error).message || "No pudimos registrar tu cuenta.";
      toast.error(message);
    }
  };

  const formAnimation = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.3 }
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <motion.div key="step1" {...formAnimation}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* Nombre */}
            <div className="w-full relative">
              <label className="text-black text-sm" htmlFor="firstName">Nombre</label>
              <User size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
              <input
                className="w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium py-2 pl-10"
                type="text" id="firstName" name="firstName"
                value={formData.firstName} onChange={handleChange} required
                ref={(el) => { attachGuards(el, sanitizeName, DISALLOWED_NAME); }}
              />
            </div>
            {/* Apellido */}
            <div className="w-full relative">
              <label className="text-black text-sm" htmlFor="lastName">Apellido</label>
              <User size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
              <input
                className="w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium py-2 pl-10"
                type="text" id="lastName" name="lastName"
                value={formData.lastName} onChange={handleChange} required
                ref={(el) => { attachGuards(el, sanitizeName, DISALLOWED_NAME); }}
              />
            </div>
            {/* Correo */}
            <div className="w-full relative md:col-span-2">
              <label className="text-black text-sm" htmlFor="email">Correo electrónico</label>
              <Mail
                size={20}
                className={`absolute left-2 ${emailTaken ? 'top-1/2 -translate-y-1/2' : 'bottom-3'
                  } text-green pointer-events-none`}
                aria-hidden="true"
              />


              <input
                className={`w-full border-b-2 transition-colors focus-visible:outline-none font-medium py-2 pl-10 ${emailTaken ? 'border-b-red-500 focus:border-b-red-500' : 'border-b-gray-300 focus:border-b-green'
                  }`}
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange} required
                ref={(el) => { attachGuards(el, sanitizeEmail, DISALLOWED_EMAIL); }}
                onBlur={async () => {
                  if (!formData.email || !validateEmail(formData.email)) return;
                  try {
                    setCheckingEmail(true);
                    const exists = await probeEmailExists(formData.email);
                    setEmailTaken(exists);
                    if (exists) toast.error("Este correo ya está registrado.");
                  } catch {
                  } finally {
                    setCheckingEmail(false);
                  }
                }}
              />
              {emailTaken && (
                <p className="text-red-500 text-sm mt-1">Este correo ya está registrado.</p>
              )}
            </div>
            {/* Contraseña */}
            <div className="w-full relative md:col-span-2">
              <label className="text-black text-sm" htmlFor="password">Contraseña</label>
              <KeyRound size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
              <input
                className="w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium py-2 pl-10 pr-10"
                type={showPassword ? "text" : "password"} id="password" name="password"
                value={formData.password} onChange={handleChange} required
                ref={(el) => { attachGuards(el, sanitizePassword, DISALLOWED_PASSWORD); }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute bottom-2.5 right-2 cursor-pointer">
                {showPassword ? <Eye size={20} className="text-green" /> : <EyeClosed size={20} className="text-green" />}
              </button>
            </div>
            {/* Criterios de contraseña */}
            <div className="md:col-span-2 flex flex-col gap-1 text-sm">
              <span className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-green' : 'text-gray-500'}`}>
                {formData.password.length >= 8 ? <CheckCircle2 size={16} /> : <XCircle size={16} />} Más de 8 caracteres
              </span>
              <span className={`flex items-center gap-2 ${hasNumber(formData.password) ? 'text-green' : 'text-gray-500'}`}>
                {hasNumber(formData.password) ? <CheckCircle2 size={16} /> : <XCircle size={16} />} Al menos un número
              </span>
            </div>
          </div>
        </motion.div>
      );
    } else {
      return (
        <motion.div key="step2" {...formAnimation}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {/* Estatura */}
            <div className="w-full relative">
              <label className="text-black text-sm" htmlFor="height">Estatura (cm)</label>
              <Ruler size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
              <select
                name="height" id="height" value={formData.height} onChange={handleChange}
                className={`w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium py-2 pl-10 pr-8 bg-white appearance-none ${!formData.height ? 'text-gray-400' : 'text-black'}`}
              >
                <option value="" disabled>Elige tu estatura</option>
                {Array.from({ length: 171 }, (_, i) => 130 + i).map(cm => <option key={cm} value={cm} className="text-black">{cm}</option>)}
              </select>
              <ChevronDown size={20} className="absolute bottom-3 right-2 text-gray-400 pointer-events-none" />
            </div>
            {/* Peso */}
            <div className="w-full relative">
              <label className="text-black text-sm" htmlFor="weight">Peso (kg)</label>
              <Weight size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
              <select
                name="weight" id="weight" value={formData.weight} onChange={handleChange}
                className={`w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium py-2 pl-10 pr-8 bg-white appearance-none ${!formData.weight ? 'text-gray-400' : 'text-black'}`}
              >
                <option value="" disabled>Elige tu peso</option>
                {Array.from({ length: 271 }, (_, i) => 30 + i).map(kg => <option key={kg} value={kg} className="text-black">{kg}</option>)}
              </select>
              <ChevronDown size={20} className="absolute bottom-3 right-2 text-gray-400 pointer-events-none" />
            </div>
            {/* Género */}
            <div className="w-full relative">
              <label className="text-black text-sm" htmlFor="gender">Género</label>
              <VenusAndMars size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
              <select
                name="gender" id="gender" value={formData.gender} onChange={handleChange}
                className={`w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium py-2 pl-10 pr-8 bg-white appearance-none ${!formData.gender ? 'text-gray-400' : 'text-black'}`}
              >
                <option value="" disabled>Elige tu género</option>
                <option value="Masculino" className="text-black">Masculino</option>
                <option value="Femenino" className="text-black">Femenino</option>
              </select>
              <ChevronDown size={20} className="absolute bottom-3 right-2 text-gray-400 pointer-events-none" />
            </div>
            {/* Fecha de Nacimiento (no se envía al backend) */}
            <div className="w-full relative">
              <label className="text-black text-sm" htmlFor="birthDate">Fecha de nacimiento</label>
              <Cake size={20} className="absolute bottom-3 left-2 text-green pointer-events-none" />
              <input
                className="w-full border-b-2 border-b-gray-300 focus:border-b-green transition-colors focus-visible:outline-none font-medium py-2 pl-10"
                type="date" id="birthDate" name="birthDate"
                value={formData.birthDate} onChange={handleChange} required
              />
            </div>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 w-full max-w-lg">
      <div>
        <h2 className="text-2xl md:text-4xl 2xl:text-[44px] text-green font-bold text-center">
          ¡Regístrate ahora!
        </h2>
        <p className="text-black text-center text-base md:text-lg 2xl:text-xl">
          Sigue los pasos para la creación de tu cuenta.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex justify-center items-center gap-2">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold transition-colors ${step >= 1 ? 'bg-blue' : 'bg-gray-300'}`}>1</div>
        <hr className={`w-10 h-0.5 transition-colors ${step === 2 ? 'bg-blue' : 'bg-gray-300'}`} />
        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold transition-colors ${step === 2 ? 'bg-blue' : 'bg-gray-300'}`}>2</div>
      </div>

      <form className="flex flex-col items-center gap-8 text-black w-full pt-5" onSubmit={handleSubmit} noValidate>
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        {/* Botones */}
        <div className="flex gap-4 w-full justify-center pt-5">
          {step === 2 && (
            <button type="button" onClick={() => setStep(1)} className="bg-blue text-white py-2.5 px-8 rounded-full font-medium cursor-pointer hover:bg-opacity-90 transition-transform active:scale-95 flex items-center gap-2">
              <ArrowLeft size={18} /> Atrás
            </button>
          )}
          {step === 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={checkingEmail || emailTaken === true}
              className="bg-green py-2.5 px-16 w-fit rounded-full text-white font-medium cursor-pointer hover:bg-opacity-90 transition-transform active:scale-95 disabled:opacity-60"
            >
              {checkingEmail ? "Verificando..." : "Siguiente"}
            </button>

          ) : (
            <button type="submit" className="bg-green py-2.5 px-16 w-fit rounded-full text-white font-medium cursor-pointer hover:bg-opacity-90 transition-transform active:scale-95">
              Finalizar
            </button>
          )}
        </div>

        <span className="text-center text-sm md:text-base">
          ¿Ya tienes una cuenta?&nbsp;
          <button type="button" onClick={() => setFormView('login')} className="font-semibold text-blue text-sm md:text-base cursor-pointer">
            Inicia sesión
          </button>
        </span>
      </form>
    </motion.section>
  );
}
