// infracstructure/services/features/plans/plans.api.ts
import { http } from "../../baseApi";
import { extractAxiosResponseData } from "../../responseExtractor";
import { sanitizeCreatePlanPayload } from "./plans.sanitize";
import type { 
  CreatePlanRequest, 
  CreatePlanResponse, 
  GetPlansResponse,
  Plan,
  DeletePlanResponse,
  GetPlanExercisesResponse,
  AddExerciseToPlanRequest,
  AddExerciseToPlanResponse,
  RemoveExerciseFromPlanResponse
} from "./plans.types";

export async function createPlan(payload: CreatePlanRequest): Promise<CreatePlanResponse> {
  const sanitizedPayload = sanitizeCreatePlanPayload(payload);
  
  const response = await http.post("api/plans", sanitizedPayload);
  
  return extractAxiosResponseData<CreatePlanResponse>(response);
}

// Get user's plans
export async function getUserPlans(): Promise<GetPlansResponse> {
  console.log('🌐 Making GET request to /Plans');
  const response = await http.get("api/plans");
  console.log('📡 Raw response:', response);
  
  const extractedData = extractAxiosResponseData<GetPlansResponse>(response);
  console.log('🔧 Extracted data:', extractedData);

  return extractedData;
}

// Get plan by ID
export async function getPlanById(planId: number): Promise<Plan> {
  const response = await http.get(`api/plans/${planId}`);
  
  return extractAxiosResponseData<Plan>(response);
}

// Update plan
export async function updatePlan(planId: number, payload: Partial<CreatePlanRequest>): Promise<CreatePlanResponse> {
  const response = await http.put(`api/plans/${planId}`, payload);
  
  return extractAxiosResponseData<CreatePlanResponse>(response);
}

// Delete plan
export async function deletePlan(planId: number): Promise<DeletePlanResponse> {
  const response = await http.delete(`api/plans/${planId}`);
  
  return extractAxiosResponseData<DeletePlanResponse>(response);
}

// Get exercises for a plan
export async function getPlanExercises(planId: number): Promise<GetPlanExercisesResponse> {
  const response = await http.get(`api/plans/${planId}/exercises`);
  
  return extractAxiosResponseData<GetPlanExercisesResponse>(response);
}

// Add exercise to plan
export async function addExerciseToPlan(planId: number, payload: AddExerciseToPlanRequest): Promise<AddExerciseToPlanResponse> {
  const response = await http.post(`api/plans/${planId}/exercises`, payload);
  
  return extractAxiosResponseData<AddExerciseToPlanResponse>(response);
}

// Remove exercise from plan
export async function removeExerciseFromPlan(planId: number, exerciseId: number): Promise<RemoveExerciseFromPlanResponse> {
  const response = await http.delete(`api/plans/${planId}/exercises/${exerciseId}`);
  
  return extractAxiosResponseData<RemoveExerciseFromPlanResponse>(response);
}