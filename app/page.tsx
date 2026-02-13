"use client";
import React, { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, UtensilsCrossed, LineChart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Header from './components/landing/Header';
import Hero from './components/landing/Hero';
import Footer from './components/landing/Footer';
import { clearSession } from '@/infracstructure/services/session';


interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}
interface TestimonialCardProps {
  quote: string;
  author: string;
  image: string;
  role: string;
}


const FeatureCard = ({ icon, title, description, color, delay }: FeatureCardProps) => (
  <motion.div
    className="p-8 rounded-3xl"
    style={{ backgroundColor: color }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="mb-4" style={{ color: 'var(--color-black)' }}>{icon}</div>
    <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-black)' }}>{title}</h3>
    <p className="text-base" style={{ color: 'var(--color-black)', opacity: 0.8 }}>{description}</p>
  </motion.div>
);

const FeaturesSection = () => (
  <section id="características" className="py-16 md:py-24 bg-gray-50">
    <div className="container">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-black)' }}>Todo lo que necesitas en un solo lugar</h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-black)', opacity: 0.7 }}>
          Herramientas diseñadas para simplificar tu camino hacia el bienestar.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Dumbbell size={40} />}
          title="Planes de Ejercicio"
          description="Crea y sigue rutinas de entrenamiento personalizadas. Registra tus series, repeticiones y peso."
          color="var(--color-green)"
          delay={0.1}
        />
        <FeatureCard
          icon={<UtensilsCrossed size={40} />}
          title="Guía de Comidas"
          description="Planifica tus comidas diarias, lleva un registro de tus calorías y macronutrientes fácilmente."
          color="var(--color-yellow)"
          delay={0.2}
        />
        <FeatureCard
          icon={<LineChart size={40} />}
          title="Seguimiento de Progreso"
          description="Visualiza tu avance con gráficos semanales y mensuales sobre tu peso, medidas y rendimiento."
          color="var(--color-blue)"
          delay={0.3}
        />
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ quote, author, image, role }: TestimonialCardProps) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg h-full flex flex-col justify-between">
    <p className="text-lg mb-6 font-medium" style={{ color: 'var(--color-black)' }}>
      &ldquo;{quote}&rdquo;
    </p>
    <div className="flex items-center">
      <Image
        src={image}
        alt={author}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full mr-4 object-cover"
      />
      <div>
        <p className="font-bold" style={{ color: 'var(--color-black)' }}>{author}</p>
        <p className="text-sm" style={{ color: 'var(--color-black)', opacity: 0.7 }}>{role}</p>
      </div>
    </div>
  </div>
);

// testimoniales
const testimonialsData = [
  {
    quote: "FitLife cambió mi forma de ver el ejercicio. Los gráficos de progreso me mantienen motivado cada semana. ¡Totalmente recomendado!",
    author: "Ana García",
    role: "Entusiasta del Fitness",
    image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "La planificación de comidas es increíblemente sencilla. Me ha ayudado a mantenerme en mi dieta sin sentir que es una tarea difícil.",
    author: "Carlos Mendoza",
    role: "Nutricionista",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "Finalmente una app que lo tiene todo. He probado muchas, pero la simplicidad y efectividad de FitLife es inigualable.",
    author: "Sofía Rodríguez",
    role: "Corredora de Maratón",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "Como principiante, me sentía perdido. FitLife me dio una estructura clara para mis entrenamientos y dieta. ¡He visto resultados en solo un mes!",
    author: "Javier Luna",
    role: "Nuevo en el Gimnasio",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "La app es visualmente agradable y muy intuitiva. El seguimiento del progreso me da un empujón extra de confianza para seguir adelante.",
    author: "Elena Torres",
    role: "Diseñadora UX/UI",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "Perfecta para mi vida ocupada. Puedo planificar mis rutinas y comidas para toda la semana en menos de 20 minutos.",
    author: "Marco Díaz",
    role: "Emprendedor",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const TestimonialsSection = () => (
  <section id="testimonios" className="pt-16 pb-5 overflow-hidden">
    <div className="container">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-black)' }}>Amado por miles de usuarios</h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-black)', opacity: 0.7 }}>
          Descubre por qué FitLife se ha convertido en su compañero de fitness indispensable.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="!pb-16" // Añadir padding-bottom para la paginación
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.author} className="self-stretch">
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* --- Controles Personalizados de Swiper --- */}
        <div className="flex justify-center items-center gap-8 mt-4">
          <div className="swiper-button-prev cursor-pointer"></div>
          <div className="swiper-pagination !relative !bottom-0"></div>
          <div className="swiper-button-next cursor-pointer"></div>
        </div>
      </motion.div>
    </div>
  </section>
);

const CtaSection = () => (
  <section id="precios" className="py-16 md:py-24">
    <div className="container">
      <motion.div
        className="rounded-3xl p-10 md:p-16 text-center"
        style={{ backgroundColor: 'var(--color-yellow)' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-5" style={{ color: 'var(--color-black)' }}>Transforma tu cuerpo y mente</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: 'var(--color-black)', opacity: 0.8 }}>
          No esperes más para empezar a construir la mejor versión de ti mismo. Únete a FitLife hoy.
        </p>
        <motion.button
          className="px-8 py-4 rounded-full text-lg font-bold text-white transition-all duration-300"
          style={{ backgroundColor: 'var(--color-blue)' }}
          whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(124, 185, 193, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/auth">
            Comenzar mi prueba gratuita
          </Link>
        </motion.button>
      </motion.div>
    </div>
  </section>
);

export default function HomePage() {

    useEffect(() => {
    // Si llegas a la landing, cerramos sesión automáticamente
    clearSession();
  }, []);
  
  return (
    <>
      <div className="font-mona-sans bg-white">
        <Header />
        <main>
          <Hero />
          <FeaturesSection />
          <TestimonialsSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}