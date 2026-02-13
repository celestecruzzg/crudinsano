import { http, extractApiError } from "../../baseApi";

export type UserItem = {
  id: string;
  name: string;
  firstLastName: string;
  secondLastName?: string | null;
  email: string;
  genre?: number | null;
  weight?: number | null;
  height?: number | null;
};

export type ListResult<T> = {
  items: T[];
  totalItems: number;
  page?: number | null;
  pageSize?: number | null;
  totalPages?: number | null;
};

export async function listUsersApi(params: { page?: number; pageSize?: number; search?: string } = {}) {
  try {
    const { page = 1, pageSize = 10, search = "" } = params;
    const { data } = await http.get<ListResult<UserItem>>("/api/users", { params: { page, pageSize, search } });
    return data;
  } catch (error) {
    throw new Error(extractApiError(error));
  }
}
