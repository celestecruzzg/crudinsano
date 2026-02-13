// infracstructure/services/features/plans/plans.types.ts

// Base Plan structure
export interface Plan {
  id: number;
  name: string;  
  description: string;
  typeOfTraining: number;
  physicalCondition: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

// Create Plan request
export interface CreatePlanRequest {
  name: string;
  description: string;
  typeOfTraining: number;
  physicalCondition: number;
}

// API Response types
export interface GetPlansResponse {
  items: Plan[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type CreatePlanResponse = Plan;

export interface DeletePlanResponse {
  success: boolean;
  message: string;
}

// Exercise related types
export interface Exercise {
  id: number;
  name: string;
  description: string;
  muscleGroup: string;
  equipment?: string;
  instructions?: string;
  difficulty: number;
}

export interface PlanExercise extends Exercise {
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  restTime?: number;
}

export interface GetPlanExercisesResponse {
  success: boolean;
  data: PlanExercise[];
  message: string;
}

export interface AddExerciseToPlanRequest {
  exerciseId: number;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  restTime?: number;
}

export interface AddExerciseToPlanResponse {
  success: boolean;
  data: PlanExercise;
  message: string;
}

export interface RemoveExerciseFromPlanResponse {
  success: boolean;
  message: string;
}