export type LoginRequest = { email: string; password: string; };

// Tu backend devuelve *AuthResult* (tokens + datos sueltos)
export type AuthResult = {
  accessToken: string;
  refreshToken: string;
  email?: string | null;
  name?: string | null;
  firstLastName?: string | null;
  secondLastName?: string | null;
};

export type RegisterRequest = {
  // Mapea 1:1 con el backend (PascalCase)
  Name: string;
  FirstLastName: string;
  SecondLastName?: string | null;
  Email: string;
  Password: string;
  Genre?: number | null;   // si no usas, omite al enviar
  Weight?: number | null;
  Height?: number | null;
};

export type RecoveryRequest = { email: string };
