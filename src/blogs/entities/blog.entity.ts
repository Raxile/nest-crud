export class Blog {
  id: number;
  title: string;
  content: string;
  createdAt: Date;

  constructor(partial: Partial<Blog>) {
    Object.assign(this, partial);
  }
}
