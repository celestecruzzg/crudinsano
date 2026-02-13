// app/hooks/usePlans.ts
'use client';

import { useState, useCallback } from 'react';
import { 
  createPlan, 
  getUserPlans, 
  getPlanById, 
  updatePlan, 
  deletePlan 
} from '../../infracstructure/services/features/plans';
import type { 
  CreatePlanRequest, 
  Plan,
  CreatePlanResponse,
  GetPlansResponse 
} from '../../infracstructure/services/features/plans';

export interface UsePlansReturn {
  // States
  plans: Plan[];
  loading: boolean;
  error: string | null;
  
  // Actions
  createNewPlan: (planData: CreatePlanRequest) => Promise<CreatePlanResponse>;
  fetchPlans: () => Promise<void>;
  fetchPlanById: (id: number) => Promise<Plan>;
  updateExistingPlan: (id: number, planData: Partial<CreatePlanRequest>) => Promise<CreatePlanResponse>;
  deleteExistingPlan: (id: number) => Promise<void>;
  clearError: () => void;
}

export function usePlans(): UsePlansReturn {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const createNewPlan = useCallback(async (planData: CreatePlanRequest): Promise<CreatePlanResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await createPlan(planData);
      
      // Actualizar la lista local de planes
      setPlans(prev => [...prev, response]);
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear el plan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlans = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Fetching plans...');
      const response: GetPlansResponse = await getUserPlans();
      console.log('📋 Plans response:', response);
      console.log('📊 Plans items:', response.items);
      setPlans(response.items);
    } catch (err) {
      console.error('❌ Error fetching plans:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los planes';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlanById = useCallback(async (id: number): Promise<Plan> => {
    setLoading(true);
    setError(null);
    
    try {
      const plan = await getPlanById(id);
      return plan;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar el plan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExistingPlan = useCallback(async (id: number, planData: Partial<CreatePlanRequest>): Promise<CreatePlanResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedPlan = await updatePlan(id, planData);
      
      // Actualizar la lista local
      setPlans(prev => prev.map(plan => 
        plan.id === id ? updatedPlan : plan
      ));
      
      return updatedPlan;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el plan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExistingPlan = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await deletePlan(id);
      
      // Remover de la lista local
      setPlans(prev => prev.filter(plan => plan.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el plan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // States
    plans,
    loading,
    error,
    
    // Actions
    createNewPlan,
    fetchPlans,
    fetchPlanById,
    updateExistingPlan,
    deleteExistingPlan,
    clearError,
  };
}