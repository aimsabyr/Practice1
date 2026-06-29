export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'done';
  createdAt: Date;
  userId: string;
}