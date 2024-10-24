import { useToast } from '@/hooks/use-toast';
import { IResultTodos } from '@/resources/interfaces/result-get-todos.interface';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Calendar, ChevronDown, Flag, Hash, Tag, Trash2 } from 'lucide-react';
import { Label } from '../ui/label';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { useGetProjectById } from '@/resources/hooks/todo.hooks';
import Task from './task';
import TodosItem from './todo-item';
import { AddTaskWrapper } from './add-task-button';

interface TaskDialogProps {
  data: IResultTodos;
}

export default function TaskDialog({ data }: TaskDialogProps) {
  const {
    taskName,
    description,
    projectId,
    priority,
    dueDate,
    labelId,
    id,
    subTodos,
  } = data;

  const { data: project } = useGetProjectById(projectId);
  const { data: label } = useGetProjectById(labelId ?? 0);

  const { toast } = useToast();

  //Todo
  // verify if the task has children

  const incompleteSubTodos = useMemo(() => {
    if (!subTodos) return [];

    return subTodos.filter((todo) => !todo.isCompleted);
  }, [subTodos]);

  const completedSubTodos = useMemo(() => {
    if (!subTodos) return [];

    return subTodos.filter((todo) => todo.isCompleted);
  }, [subTodos]);

  const parentId = data.id;

  // TODO
  // add hook to delete task

  const todoDetails = useMemo(() => {
    const data = [
      {
        labelName: 'Project',
        value: project?.name || '',
        icon: <Hash className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: 'Due date',
        value: format(new Date(dueDate) || new Date(), 'MMM dd yyyy'),
        icon: <Calendar className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: 'Priority',
        value: priority?.toString() || '',
        icon: <Flag className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: 'Label',
        value: label?.name || '',
        icon: <Tag className="w-4 h-4 text-primary capitalize" />,
      },
    ];
    return data;
  }, [dueDate, priority, project, label]);

  const handleDeleteTodo = (e: any) => {
    e.preventDefault();
    // deleteTodoMutation({ taskId: id });
    toast({
      title: 'Task deleted',
      description: 'Task has been deleted successfully',
      duration: 5000,
    });
  };

  return (
    <DialogContent className="max-w-4xl lg:h-4/6 flex flex-col md:flex-row lg:justify-between text-right">
      <DialogHeader className="w-full">
        <DialogTitle>{taskName}</DialogTitle>
        <DialogDescription>
          <span className="my-2 capitalize">{description}</span>
          <div className="flex items-center gap-1 mt-12 border-b-2 border-gray-100 pb-2 flex-wrap sm:justify-between lg:gap-0 ">
            <div className="flex gap-1">
              <ChevronDown className="w-5 h-5 text-primary" />
              <p className="font-bold flex text-sm text-gray-900">Sub-tasks</p>
            </div>
          </div>
          <div className="pl-4">
            <TodosItem items={incompleteSubTodos} />
            <div className="pb-4">
              <AddTaskWrapper parentId={parentId} />
            </div>
            <TodosItem items={completedSubTodos} />
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2 bg-gray-100 lg:w-1/2">
        {todoDetails.map(({ labelName, value, icon }, idx) => (
          <div
            key={`${value}-${idx}`}
            className="grid gap-2 p-4 border-b-2 w-full"
          >
            <Label className="flex items-start">{labelName}</Label>
            <div className="flex text-left items-center justify-start gap-2 pb-2">
              {icon}
              <p className="text-sm">{value}</p>
            </div>
          </div>
        ))}
        <div className="flex gap-2 p-4 w-full justify-end">
          <form onSubmit={(e) => handleDeleteTodo(e)}>
            <button type="submit">
              <Trash2 className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </DialogContent>
  );
}
