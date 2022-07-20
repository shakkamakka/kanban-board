export interface ListProps {
  id: number;
  value: string;
  tasks: TaskProps[];
}

export interface TaskProps{
  id: number;
  title: string;
  description: string;
};