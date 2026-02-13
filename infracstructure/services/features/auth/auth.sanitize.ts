// app/features/auth/auth.sanitize.ts
import { stripControl } from "@/app/lib/sanitize";

export function sanitizePayload<T extends Record<string, any>>(input: T): T {
  // Sanitización conservadora: elimina null/undefined, recorta strings, quita control chars
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(input)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string") {
      out[k] = stripControl(v).trim();
    } else {
      out[k] = v;
    }
  }
  return out as T;
}
