import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "El correo es obligatorio").max(120).email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres").max(128),
});
export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Muy corto").max(60),
  firstLastName: z.string().min(2, "Muy corto").max(60),
  secondLastName: z.string().optional(),
  email: z.string().min(1, "Obligatorio").max(120).email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres").max(128),
});
export type RegisterForm = z.infer<typeof registerSchema>;

export const recoverySchema = z.object({
  email: z.string().min(1, "El correo es obligatorio").max(120).email("Correo inválido"),
});
export type RecoveryForm = z.infer<typeof recoverySchema>;
