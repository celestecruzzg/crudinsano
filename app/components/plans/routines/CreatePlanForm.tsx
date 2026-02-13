'use client';

import { FC, FormEvent } from 'react';
import { X, Target, Dumbbell, Activity, Calendar, Clock } from 'lucide-react';
import Swal from 'sweetalert2';
import { usePlans } from '../../../hooks/usePlans';

interface CreatePlanFormProps {
  onClose: () => void;
}

const CreatePlanForm: FC<CreatePlanFormProps> = ({ onClose }) => {
  const { createNewPlan, loading, clearError } = usePlans();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Obtener los valores directamente del formulario
    const name = formData.get('name') as string;
    const description = formData.get('description') as string || '';
    const training = parseInt(formData.get('training') as string);
    const condition = parseInt(formData.get('condition') as string);

    // Validar que los valores sean válidos
    if (!name.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'El nombre del plan es obligatorio.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#b6d99b',
      });
      return;
    }

    const planData = {
      name: name.trim(),
      description: description.trim(),
      typeOfTraining: training,
      physicalCondition: condition
    };

    try {
      // Limpiar errores previos
      clearError();

      // Usar nuestro servicio centralizado que maneja tokens automáticamente
      await createNewPlan(planData);

      onClose(); // Cierra el modal
      Swal.fire({
        title: '¡Guardado!',
        text: 'Tu plan de ejercicio ha sido guardado con éxito.',
        icon: 'success',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#b6d99b',
      });
    } catch (error) {
      console.error('Error creating plan:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar el plan. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#b6d99b',
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">Crear plan de ejercicio</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          {/* Nombre del Plan */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Target className="w-5 h-5 text-green" />
              Nombre del Plan
            </label>
            <input
              name="name"
              type="text"
              required

              placeholder="Ej: Mi Plan de Cardio Básico"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Target className="w-5 h-5 text-green" />
              Descripción
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Describe tu plan de ejercicios..."
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo de Entrenamiento */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Dumbbell className="w-5 h-5 text-green" />
                Tipo de Entrenamiento
              </label>
              <select name="training" required className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">Selecciona una opción</option>
                <option value="1">Cardio</option>
                <option value="2">Fuerza</option>
                <option value="3">Mixto</option>
              </select>
            </div>

            {/* Condición Física */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Activity className="w-5 h-5 text-green" />
                Nivel de Condición Física
              </label>
              <select name="condition" required className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">Selecciona tu nivel</option>
                <option value="1">Principiante</option>
                <option value="2">Intermedio</option>
                <option value="3">Avanzado</option>
              </select>
            </div>
          </div>

          {/* Información adicional (solo visual, no se envía a la API) */}
          <div className="grid grid-cols-2 gap-4 opacity-75">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Calendar className="w-5 h-5 text-gray-400" />
                Frecuencia (Referencia)
              </label>
              <select className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600">
                <option>3-4 días/semana</option>
                <option>5-6 días/semana</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Clock className="w-5 h-5 text-gray-400" />
                Duración (Referencia)
              </label>
              <select className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600">
                <option>30-45 min</option>
                <option>60-90 min</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-green text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlanForm;
