// infracstructure/services/features/plans/plans.sanitize.ts
import { stripTags, stripControl, normalizeSpaces } from "../../../../app/lib/sanitize";
import type { CreatePlanRequest } from "./plans.types";

function sanitizeString(value: string): string {
  return normalizeSpaces(stripTags(stripControl(value || "")));
}

function sanitizeNumber(value: number): number {
  return Number.isInteger(value) && value >= 0 ? value : 0;
}

export function sanitizeCreatePlanPayload(payload: CreatePlanRequest): CreatePlanRequest {
  return {
    name: sanitizeString(payload.name).trim(),
    description: sanitizeString(payload.description).trim(),
    typeOfTraining: sanitizeNumber(payload.typeOfTraining),
    physicalCondition: sanitizeNumber(payload.physicalCondition),
  };
}