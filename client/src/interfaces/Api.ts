export interface Model {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Token {
  app: string;
  exp: number;
  iat: number;
}
