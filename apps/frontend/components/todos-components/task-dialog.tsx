import { useToast } from '@/hooks/use-toast';
import { IResultTodos } from '@/resources/interfaces/result-get-todos.interface';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Calendar, ChevronDown, Flag, Trash2 } from 'lucide-react';
import { Label } from '../ui/label';
import { useMemo } from 'react';
import { format } from 'date-fns';

interface TaskDialogProps {
  data: IResultTodos;
}

export default function TaskDialog({ data }: TaskDialogProps) {
  const { taskName, description, projectId, priority, dueDate, id } = data;

  // TODO
  // add hook to get project by id

  const { toast } = useToast();

  //Todo
  // verify if the task has children

  //TODO
  // add hooks to check and uncheck after

  // TODO
  // add hook to delete task

  //todo alterar no back para projetos poder ter o userId nulo
  // para buscar por Id do projeto e não do usuário

  const todoDetails = useMemo(() => {
    const data = [
      //   {
      //     labelName: 'Project',
      //     value: project?.name || '',
      //     icon: <Hash className="w-4 h-4 text-primary capitalize" />,
      //   },
      {
        labelName: 'Due date',
        value: format(dueDate || new Date(), 'MMM dd yyyy'),
        icon: <Calendar className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: 'Priority',
        value: priority?.toString() || '',
        icon: <Flag className="w-4 h-4 text-primary capitalize" />,
      },
      // {
      //   labelName: 'Label',
      //   value: label?.name || '',
      //   icon: <Tag className="w-4 h-4 text-primary capitalize" />,
      // },
    ];
    return data;
  }, [dueDate, priority]);

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
            {/* {inCompletedSubtodosByProject.map((task) => {
              return (
                <Task
                  key={task._id}
                  data={task}
                  isCompleted={task.isCompleted}
                  handleOnChange={() =>
                    checkASubTodoMutation({ taskId: task._id })
                  }
                />
              );
            })} */}
            <div className="pb-4">
              {/* <AddTaskWrapper parentTask={data} /> */}
            </div>
            {/* {completedSubtodosByProject.map((task) => {
              return (
                <Task
                  key={task._id}
                  data={task}
                  isCompleted={task.isCompleted}
                  handleOnChange={() =>
                    unCheckASubTodoMutation({ taskId: task._id })
                  }
                />
              );
            })} */}
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