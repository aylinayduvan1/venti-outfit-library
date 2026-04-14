import axios from "axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "types/auth";

const API_URL = "http://localhost:4000/auth";

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const { data: response } = await axios.post<AuthResponse>(`${API_URL}/login`,data);
  return response;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const { data: response } = await axios.post<AuthResponse>(`${API_URL}/register`,data);
  return response;
};