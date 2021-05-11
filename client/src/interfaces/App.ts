export interface App {
  id: number;
  name: string;
  url: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppResponse {
  success: boolean;
  data: App[]
}