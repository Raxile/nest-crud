// types/response.type.ts
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}
