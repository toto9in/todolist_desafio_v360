export interface IResultLabel {
  id: number;
  userId: number | null;
  name: string;
  type: string;
}

export type IResultGetLabels = IResultLabel[];
