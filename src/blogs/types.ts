export interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface ResponseDto<T> {
  code: number;
  message: string;
  data: T | null;
}
