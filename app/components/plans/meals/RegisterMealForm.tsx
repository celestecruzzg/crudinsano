'use client';

import { FC, FormEvent } from 'react';
import { X, Utensils, PieChart, List, Calendar, Flame } from 'lucide-react';
import Swal from 'sweetalert2';

interface RegisterMealFormProps {
  onClose: () => void;
}

const RegisterMealForm: FC<RegisterMealFormProps> = ({ onClose }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
    Swal.fire({
      title: '¡Registrado!',
      text: 'Tu comida ha sido registrada con éxito.',
      icon: 'success',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#b6d99b',
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Registrar comida</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {/* Tipo de comida */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Utensils className="w-5 h-5 text-green" />
              Tipo de comida
            </label>
            <select required className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-green focus:border-green text-gray-500">
              <option value="">Selecciona una opción</option>
              <option>Desayuno</option>
              <option>Almuerzo</option>
              <option>Cena</option>
              <option>Snack</option>
            </select>
          </div>

          {/* Porción */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <PieChart className="w-5 h-5 text-green" />
              Porción
            </label>
            <select required className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-green focus:border-green text-gray-500">
              <option value="">Selecciona una opción</option>
              <option>Pequeña</option>
              <option>Mediana</option>
              <option>Grande</option>
            </select>
          </div>

          {/* Alimentos consumidos */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <List className="w-5 h-5 text-green" />
              Alimentos consumidos
            </label>
            <input
              required
              type="text"
              placeholder="Ingresa"
              className="w-full p-2.5 border-b border-gray-300 focus:border-b-2 focus:border-green outline-none bg-transparent text-sm text-gray-500"
            />
          </div>

          {/* Fecha */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-5 h-5 text-green" />
              Fecha
            </label>
            <select required className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-green focus:border-green text-gray-500">
              <option value="">Selecciona una opción</option>
              <option>Hoy</option>
              <option>Ayer</option>
            </select>
          </div>

          {/* Calorías estimadas */}
          <div className="col-span-2 space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Flame className="w-5 h-5 text-green" />
              Calorías estimadas
            </label>
            <input
              required
              type="text"
              placeholder="Ingresa calorías estimadas"
              className="w-full p-2.5 border-b border-gray-300 focus:border-b-2 focus:border-green outline-none bg-transparent text-sm text-gray-500"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-green text-white font-semibold px-8 py-2.5 rounded-lg hover:opacity-85 transition-colors"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterMealForm;
