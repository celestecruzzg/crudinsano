'use client';

import { CirclePlus } from 'lucide-react';
import MealCard from './MealCard';
import { useModal } from '@/app/components/ui/modal/ModalContext';
import RegisterMealForm from './RegisterMealForm';

const meals = [
  { name: 'Pasta con jamoncito', servings: 1, day: '22/09/25', calories: 417 },
  { name: 'Ensalada', servings: 1, day: '22/09/25', calories: 350 },
  { name: 'Pasta', servings: 1, day: '23/09/25', calories: 500 },
  { name: 'Pasta', servings: 2, day: '23/09/25', calories: 600 },
  { name: 'Pasta', servings: 1, day: '24/09/25', calories: 450 },
  { name: 'Pasta', servings: 1, day: '24/09/25', calories: 480 },
  { name: 'Pasta', servings: 1, day: '25/09/25', calories: 250 },
];

const MealsSection = () => {
  const { showModal, hideModal } = useModal();

  const handleRegisterMealClick = () => {
    showModal(<RegisterMealForm onClose={hideModal} />);
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Mis comidas</h2>
        <button
          onClick={handleRegisterMealClick}
          className="flex items-center gap-2 text-sm font-medium text-black hover:opacity-85 border-[0.5px] border-green px-4 h-9 rounded-lg shadow-md w-full md:w-auto justify-center cursor-pointer"
        >
          Registrar comida
          <span className="flex items-center justify-center bg-green/30 text-green w-6 h-6 rounded-full">
            <CirclePlus className="w-4 h-4" />
          </span>
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[60vh] md:max-h-[calc(100vh-200px)] hide-scrollbar">
        {meals.map((meal, index) => (
          <MealCard key={index} meal={meal} />
        ))}
      </div>
    </section>
  );
};

export default MealsSection;
