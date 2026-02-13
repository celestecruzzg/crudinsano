"use client";

import { useEffect } from "react";
import { CirclePlus } from "lucide-react";
import RoutineCard, { Routine } from "./RoutineCard"; 
import { useModal } from "@/app/components/ui/modal/ModalContext";
import CreatePlanForm from "./CreatePlanForm";
import { usePlans } from "../../../hooks/usePlans";
import type { Plan } from "../../../../infracstructure/services/features/plans";

// Función para convertir Plan a Routine
const convertPlanToRoutine = (plan: Plan): Routine => {
  // Mapear typeOfTraining a nivel
  const getLevelFromTraining = (type: number): string => {
    switch (type) {
      case 1: return "Principiante";
      case 2: return "Intermedio";  
      case 3: return "Avanzado";
      default: return "Intermedio";
    }
  };

  // Mapear physicalCondition a objetivo
  const getGoalFromCondition = (condition: number): string => {
    switch (condition) {
      case 1: return "Pérdida de peso";
      case 2: return "Ganancia muscular";
      case 3: return "Resistencia";
      case 4: return "Mantenimiento";
      default: return "Mantenimiento";
    }
  };

  // Función para obtener la fecha actual formateada
  const getCurrentFormattedDate = (): string => {
    const today = new Date();
    return today.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  return {
    id: plan.id,
    title: plan.name,
    level: getLevelFromTraining(plan.typeOfTraining),
    goal: getGoalFromCondition(plan.physicalCondition), 
    description: plan.description,
    startDate: getCurrentFormattedDate(),
    duration: "45 min", 
    daysPerWeek: 3, 
  };
};

const RoutinesSection = () => {
  const { showModal, hideModal } = useModal();
  const { plans, loading, error, fetchPlans } = usePlans();

  // Cargar planes al montar el componente
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleCreatePlanClick = () => {
    showModal(<CreatePlanForm onClose={() => {
      hideModal();
      // Recargar planes después de crear uno nuevo
      fetchPlans();
    }} />);
  };

  // Verificar que plans esté definido antes de hacer el map
  const routines = (plans || []).map(convertPlanToRoutine);

  // Mostrar estado de carga
  if (loading) {
    return (
      <section className="bg-white p-6 rounded-2xl shadow-sm h-full w-full">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Cargando rutinas...</div>
        </div>
      </section>
    );
  }

  // Mostrar error si existe
  if (error) {
    return (
      <section className="bg-white p-6 rounded-2xl shadow-sm h-full w-full">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm h-full w-full ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold text-black">Mis rutinas</h2>
        <button
          onClick={handleCreatePlanClick}
          className="flex items-center gap-2 text-sm font-medium text-black hover:opacity-85 border-[0.5px] border-green px-4 h-9 rounded-lg shadow-md w-full md:w-auto justify-center cursor-pointer"
        >
          Crear plan
          <span className="flex items-center justify-center bg-green/30 text-green w-6 h-6 rounded-full">
            <CirclePlus className="w-4 h-4" />
          </span>
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[60vh] md:max-h-[calc(100vh-200px)] hide-scrollbar">
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Cargando planes...</div>
          </div>
        )}
        
        {error && (
          <div className="flex justify-center items-center py-8">
            <div className="text-red-500">Error: {error}</div>
          </div>
        )}
        
        {!loading && !error && routines.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">No tienes planes creados aún. ¡Crea tu primer plan!</div>
          </div>
        )}
        
        {!loading && routines.length > 0 && routines.map((routine) => (
          <RoutineCard key={routine.id || routine.title} {...routine} />
        ))}
      </div>
    </section>
  );
};

export default RoutinesSection;
