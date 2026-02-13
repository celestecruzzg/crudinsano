// infracstructure/services/session.ts
type Tokens = {
  accessToken: string;
  refreshToken?: string | null;
};
type AuthUser = Record<string, any>;

type AuthResult =
  | { tokens: Tokens; user?: AuthUser }             
  | { accessToken: string; refreshToken?: string; user?: AuthUser }; 

const LS_KEY = "fitlife:session";

export function setSessionFromAuthResult(res: AuthResult) {
  const tokens: Tokens = "tokens" in res
    ? res.tokens
    : { accessToken: (res as any).accessToken, refreshToken: (res as any).refreshToken };

  const user: AuthUser | undefined = (res as any).user;

  if (!tokens?.accessToken) throw new Error("No access token in response");

  const data = {
    accessToken: tokens.accessToken,
    refreshToken: tokens?.refreshToken ?? null,
    user: user ?? null,
    ts: Date.now(),
  };
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function getSession() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
export function getAccessToken(): string | null {
  return getSession()?.accessToken ?? null;
}
export function getRefreshToken(): string | null {
  return getSession()?.refreshToken ?? null;
}
export function getUser(): any | null {
  return getSession()?.user ?? null;
}
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
export function clearSession() {
  localStorage.removeItem(LS_KEY);
}
