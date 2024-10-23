export interface ICreateTaskDto {
  projectId: number | null;
  taskName: string;
  description: string | null;
  dueDate: string;
  priority: string;
  parentId: number | null;
  labelId: number | null;
}
