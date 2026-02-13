"use client"; // Directiva necesaria para usar hooks (useState) y animaciones

import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, X, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  // Cierra el menú si se hace clic en un enlace de navegación
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="py-6 fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="container flex justify-between items-center">
        {/* MEJORA: El logo ahora apunta a la página de inicio "/" */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold" style={{ color: 'var(--color-black)' }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Dumbbell className="text-[--color-blue]" />
          </motion.div>
          <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            FitLife
          </motion.span>
        </Link>

        {/* Navegación para escritorio */}
        <nav className="hidden md:flex items-center gap-8">
          {['Características', 'Testimonios', 'Precios'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-base font-medium hover:text-[--color-blue] transition-colors"
              style={{ color: 'var(--color-black)' }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              variants={navItemVariants}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/auth"
              className="px-6 py-2 block rounded-full font-semibold text-white transition-all duration-300"
              style={{ backgroundColor: 'var(--color-blue)' }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Empezar
              </motion.div>
            </Link>
          </motion.div>
        </div>
        
        {/* Botón para menú móvil */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="z-50 relative">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X /> : <Menu />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>
      
      {/* Menú Overlay para móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {['Características', 'Testimonios', 'Precios'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={closeMenu}
                  className="text-2xl font-medium"
                  style={{ color: 'var(--color-black)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Link
                  href="/auth"
                  onClick={closeMenu}
                  className="mt-4 px-8 py-4 block rounded-full text-lg font-semibold text-white"
                  style={{ backgroundColor: 'var(--color-blue)' }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Empezar
                  </motion.div>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;