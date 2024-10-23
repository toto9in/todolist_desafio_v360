export interface IResultProject {
  id: number;
  userId: number | null;
  name: string;
  type: string;
}

export type IResultGetProjects = IResultProject[];
