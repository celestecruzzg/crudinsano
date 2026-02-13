"use client";

import { CakeSlice, CalendarDays, Flame, Salad } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MealsSection() {
    const meals = [
        { id: 1, name: "Pasta con jamoncito", portions: 1, date: "22/09/25", calories: 417 },
        { id: 2, name: "Pasta con jamoncito", portions: 1, date: "22/09/25", calories: 417 },
        { id: 3, name: "Pasta con jamoncito", portions: 1, date: "22/09/25", calories: 417 },
        { id: 4, name: "Pasta con jamoncito", portions: 1, date: "22/09/25", calories: 417 },
        { id: 5, name: "Pasta con jamoncito", portions: 1, date: "22/09/25", calories: 417 },
        { id: 6, name: "Pasta con jamoncito", portions: 1, date: "22/09/25", calories: 417 },
        { id: 7, name: "Pasta con jamoncito", portions: 1, date: "22/09/25", calories: 417 },
        { id: 8, name: "Pasta con jamoncito", portions: 1, date: "22/09/25", calories: 417 },
    ];

    return (
        <section className="bg-white rounded-2xl p-4 md:p-6 shadow-sm h-[400px] flex flex-col w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 flex-shrink-0">
                <h2 className="text-xl md:text-2xl font-medium text-gray-800">Comidas</h2>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 hide-scrollbar">
                <AnimatePresence>
                    {meals.map((meal) => (
                        <motion.div
                            key={meal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: meal.id * 0.1 }}
                            className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Salad className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-green)]" />
                            </div>
                            <div className="flex-1 w-full">
                                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">Comida</h3>
                                <p className="text-sm md:text-base text-gray-800 font-medium mb-2 md:mb-3">{meal.name}</p>
                                <div className="space-y-1">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                                                <CakeSlice className="w-4 h-4 text-[var(--color-green)]" />
                                            </div>
                                            <span className="text-xs md:text-sm text-gray-600">Porciones: {meal.portions}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                                                <CalendarDays className="w-4 h-4 text-[var(--color-green)]" />
                                            </div>
                                            <span className="text-xs md:text-sm text-gray-600">Día: {meal.date}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                                            <Flame className="w-4 h-4 text-[var(--color-green)]" />
                                        </div>
                                        <span className="text-xs md:text-sm text-gray-600">Calorías estimadas: {meal.calories} Kcal</span>
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
    )
}
