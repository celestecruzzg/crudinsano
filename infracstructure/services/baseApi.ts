// infracstructure/services/baseApi.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken, clearSession } from "./session";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "";

export const http = axios.create({
  baseURL,
  withCredentials: false,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- refresh automático con cola ----
let isRefreshing = false;
let waiters: Array<(token: string) => void> = [];
const wake = (t: string) => { waiters.forEach(cb => cb(t)); waiters = []; };

async function doRefresh(): Promise<string> {
  const rt = getRefreshToken();
  if (!rt) throw new Error("No refresh token");
  // OJO: tu backend espera el refresh en la URL, no en el body:
  const { data } = await axios.post(`${baseURL}/api/auth/refresh-token/${encodeURIComponent(rt)}`);
  // devuelve AuthResult: { accessToken, refreshToken, ... }
  if (data?.accessToken && data?.refreshToken) {
    localStorage.setItem("fitlife_access_token", data.accessToken);
    localStorage.setItem("fitlife_refresh_token", data.refreshToken);
    return data.accessToken as string;
  }
  throw new Error("Refresh sin tokens");
}

http.interceptors.response.use(
  r => r,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original: any = error.config || {};
    if (status === 401 && !original._retry && !String(original.url).includes("/api/auth/refresh-token/")) {
      original._retry = true;
      try {
        if (isRefreshing) {
          const newToken = await new Promise<string>(res => waiters.push(res));
          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${newToken}`;
          return http(original);
        }
        isRefreshing = true;
        const newToken = await doRefresh();
        isRefreshing = false;
        wake(newToken);
        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${newToken}`;
        return http(original);
      } catch (e) {
        isRefreshing = false;
        waiters = [];
        clearSession();
        if (typeof window !== "undefined") window.location.assign("/auth");
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export function extractApiError(error: unknown): string {
  const err = error as any;
  const data = err?.response?.data;
  if (data) {
    if (Array.isArray(data?.errors) && data.errors.length) {
      const first = data.errors[0];
      return first?.description || first?.code || data.title || "Error en la solicitud.";
    }
    if (Array.isArray(data?.errorCodes) && data.errorCodes.length) return data.errorCodes[0];
    if (typeof data?.detail === "string") return data.detail;
    if (typeof data?.title === "string") return data.title;
    if (typeof data?.message === "string") return data.message;
  }
  if (typeof err?.message === "string") return err.message;
  return "Ocurrió un error inesperado.";
}
