import { http, extractApiError } from "../../baseApi";
import { sanitizePayload } from "./auth.sanitize";
import type { LoginRequest, AuthResult, RegisterRequest, RecoveryRequest } from "./auth.types";

export async function loginApi(payload: LoginRequest): Promise<AuthResult> {
  try {
    const body = sanitizePayload(payload);
    const { data } = await http.post<AuthResult>("/api/auth/login", body);
    return data;
  } catch (error) { throw new Error(extractApiError(error)); }
}

export async function registerApi(payload: RegisterRequest): Promise<AuthResult> {
  try {
    const body = sanitizePayload(payload);
    const { data } = await http.post<AuthResult>("/api/auth/register", body);
    return data;
  } catch (error) { throw new Error(extractApiError(error)); }
}

// OJO: backend espera el email como *query param*
export async function accountRecoveryApi(payload: RecoveryRequest): Promise<{ ok: true }> {
  try {
    const p = sanitizePayload(payload);
    await http.post("/api/auth/account-recovery", null, { params: { email: p.email } });
    return { ok: true };
  } catch (error) { throw new Error(extractApiError(error)); }
}
