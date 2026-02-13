'use client';

import { Dumbbell } from "lucide-react";
import { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import RegisterForm from "../../components/auth/RegisterForm";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";


type FormView = 'login' | 'register' | 'forgotPassword';

export default function Home() {
  const [formView, setFormView] = useState<FormView>('login');

  return (
    <main className="flex flex-col md:flex-row bg-white min-h-screen">
      <section className="
        w-full md:w-2/5 
        h-64 md:h-screen 
        bg-[url('/img/portada-login.webp')] bg-cover bg-center 
        p-8 flex flex-col justify-between text-white
      ">
        <Link href="/" className="flex items-center gap-3">
          <Dumbbell size={30} />
          <h3 className="text-3xl font-bold">FitLife</h3>
        </Link>
        <p className="
          text-3xl sm:text-4xl font-bold text-center 
          md:mt-54 2xl:text-6xl 2xl:mt-72
        ">
          “Cuerpo sano, mente sana, FitLife.”
        </p>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>

      </section>

      <section className="w-full md:w-3/5 container mx-auto flex flex-col justify-center items-center p-8 flex-grow">
        <AnimatePresence mode="wait">
          {formView === 'login' && (
            <AuthForm key="login" setFormView={setFormView} />
          )}
          {formView === 'register' && (
            <RegisterForm key="register" setFormView={setFormView} />
          )}
          {formView === 'forgotPassword' && (
            <ForgotPasswordForm key="forgot" setFormView={setFormView} />
          )}
        </AnimatePresence>
        {/* <Copyright /> */}
      </section>
    </main>
  );
}
