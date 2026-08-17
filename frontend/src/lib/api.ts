const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3333/api/v1";

export interface User {
  id: number;
  fullName: string | null;
  email: string;
  initials: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}

export interface SignupInput {
  fullName?: string | null;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export class ApiError extends Error {}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string } = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.errors
        ?.map((error: { message: string }) => error.message)
        .join(" ") || "No pudimos completar la solicitud. Intentá de nuevo.";
    throw new ApiError(message);
  }

  return payload.data as T;
}

export function signup(input: SignupInput) {
  return request<AuthPayload>("/auth/signup", { method: "POST", body: input });
}

export function login(input: LoginInput) {
  return request<AuthPayload>("/auth/login", { method: "POST", body: input });
}

export function getProfile(token: string) {
  return request<User>("/account/profile", { token });
}

export function logout(token: string) {
  return request<{ message: string }>("/account/logout", {
    method: "POST",
    token,
  });
}
