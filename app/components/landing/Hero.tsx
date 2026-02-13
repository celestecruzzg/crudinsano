"use client"; // Necesario para que las animaciones de Framer Motion funcionen

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Importamos el componente de Imagen optimizada

const Hero = () => {
  // Manejamos el estado de la imagen para el fallback en caso de error
  const initialImage = "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const fallbackImage = "https://placehold.co/1260x750/E8DE98/303030?text=FitLife+Hero";
  const [imgSrc, setImgSrc] = useState(initialImage);

  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      <div className="container text-center">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          style={{ color: 'var(--color-black)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Tu viaje hacia una vida <span style={{ color: 'var(--color-green)' }}>saludable</span> empieza hoy.
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-3xl mx-auto mb-10"
          style={{ color: 'var(--color-black)', opacity: 0.8 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          FitLife es tu guía personal para el seguimiento de planes de ejercicio y comidas. Alcanza tus metas y observa tu progreso semana a semana.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full text-lg font-bold text-white transition-all duration-300 cursor-pointer"
            style={{ backgroundColor: 'var(--color-blue)' }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(124, 185, 193, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/auth">
              Únete a la comunidad
            </Link>
          </motion.button>
        </motion.div>
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
        >
          {/* CAMBIO CLAVE: Usamos <Image> en lugar de <img> */}
          <Image
            src={imgSrc}
            alt="Persona entrenando en un gimnasio"
            width={1260} // Ancho original de la imagen
            height={750} // Alto original de la imagen
            className="rounded-3xl shadow-2xl mx-auto w-full max-w-5xl"
            onError={() => setImgSrc(fallbackImage)}
            priority // Le damos prioridad de carga a esta imagen
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;