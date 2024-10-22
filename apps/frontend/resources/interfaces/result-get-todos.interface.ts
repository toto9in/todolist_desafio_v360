export interface IResultTodos {
  id: number;
  projectId: number | null;
  taskName: string;
  description: string | null;
  dueDate: string;
  priority: string;
  isCompleted: boolean;
  parentId: number | null;
}

export type IResultGetTodos = IResultTodos[];
