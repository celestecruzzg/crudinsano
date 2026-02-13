"use client";

import { Bike, CalendarDays, Repeat, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExercisePlans() {
  const plans = [
    { id: 1, title: "Plan 1 - Principiante", description: "Descripción del plan", startDate: "22/09/2025", frequency: "3", duration: "30 min" },
    { id: 2, title: "Plan 2 - Intermedio", description: "Descripción del plan", startDate: "22/09/2025", frequency: "3", duration: "30 min" },
    { id: 3, title: "Plan 3 - Avanzado", description: "Descripción del plan", startDate: "22/09/2025", frequency: "3", duration: "30 min" },
    { id: 4, title: "Plan 1 - Principiante", description: "Descripción del plan", startDate: "22/09/2025", frequency: "3", duration: "30 min" },
    { id: 5, title: "Plan 2 - Intermedio", description: "Descripción del plan", startDate: "22/09/2025", frequency: "3", duration: "30 min" },
    { id: 6, title: "Plan 3 - Avanzado", description: "Descripción del plan", startDate: "22/09/2025", frequency: "3", duration: "30 min" },
    { id: 7, title: "Plan 1 - Principiante", description: "Descripción del plan", startDate: "22/09/2025", frequency: "3", duration: "30 min" },
    { id: 8, title: "Plan 2 - Intermedio", description: "Descripción del plan", startDate: "22/09/2025", frequency: "3", duration: "30 min" },
    { id: 9, title: "Plan 3 - Avanzado", description: "Descripción del plan", startDate: "22/09/2025", frequency: "3", duration: "30 min" },
  ];

  return (
    <section className="bg-white rounded-2xl p-4 md:p-6 shadow-sm h-[887px] flex flex-col w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 flex-shrink-0">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800">Planes de ejercicio</h2>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1 hide-scrollbar">
        <AnimatePresence>
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: plan.id * 0.1 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bike className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-green)]" />
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">Plan</h3>
                <p className="text-sm md:text-base text-gray-800 font-medium mb-2 md:mb-3">{plan.title}</p>
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                        <CalendarDays className="w-4 h-4 text-[var(--color-green)]" />
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">Inicio: {plan.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                        <Repeat className="w-4 h-4 text-[var(--color-green)]" />
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">Días: {plan.frequency}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                      <Timer className="w-4 h-4 text-[var(--color-green)]" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-600">Duración: {plan.duration}</span>
                  </div>
                </div>
              </div>
              {/* <button className="w-full md:w-auto px-4 py-2 bg-[var(--color-green)] font-semibold text-white text-xs md:text-sm rounded-lg hover:bg-[#90C567] transition-colors flex-shrink-0">
                Ver más detalles
              </button> */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}