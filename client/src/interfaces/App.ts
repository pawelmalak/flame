export interface App {
  id: number;
  name: string;
  url: string;
  icon: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppResponse<T> {
  success: boolean;
  data: T;
}

export interface NewApp {
  name: string;
  url: string;
  icon: string;
}