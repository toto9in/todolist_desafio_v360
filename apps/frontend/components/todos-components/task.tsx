import clsx from 'clsx';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { GitBranch, Trash2Icon } from 'lucide-react';

import { IResultTodos } from '@/resources/interfaces/result-get-todos.interface';
import TaskDialog from './task-dialog';
import { Button } from '../ui/button';
import { DeleteDialog } from '../delete-dialog';
import { useState } from 'react';
import { useDeleteTask } from '@/resources/hooks/todo.hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function Task({
  data,
  isCompleted,
  handleOnChange,
  hasChildren = false,
}: {
  data: IResultTodos;
  isCompleted: boolean;
  handleOnChange: () => void;
  hasChildren?: boolean;
}) {
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);

  const deleteTask = useDeleteTask();

  const queryClient = useQueryClient();

  const { taskName, description, id } = data;

  return (
    <div
      key={data.id}
      className="w-full flex-row items-center space-x-2 border-b-2 p-2 border-gray- animate-in fade-in"
    >
      <Dialog>
        <div className="flex gap-2 items-center justify-end w-full">
          <div className="flex gap-2 w-full items-center justify-center">
            <Checkbox
              id="todo"
              className={clsx(
                'w-5 h-5 rounded-xl hover:bg-purple-100 hover:text-purple-700',
                isCompleted &&
                  'data-[state=checked]:bg-gray-300 border-gray-300'
              )}
              checked={isCompleted}
              onCheckedChange={handleOnChange}
            />
            <DialogTrigger asChild>
              <div className="w-full flex  items-start">
                <button
                  className={clsx(
                    'w-full flex font-normal text-left whitespace-nowrap text-base',
                    isCompleted && 'line-through text-foreground/30'
                  )}
                >
                  <div className="flex flex-col">
                    <span className="">{taskName}</span>
                    {description && (
                      <span className="text-sm text-gray-500">
                        {description}
                      </span>
                    )}
                    {hasChildren && (
                      <div className="flex pt-1">
                        <GitBranch className="w-5 h-5 text-primary" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </DialogTrigger>
          </div>
          <Button
            variant="ghost"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              setIsDeleteTaskDialogOpen(true);
            }}
          >
            <Trash2Icon className="text-red-500 h-5 w-5" />
          </Button>
          <TaskDialog data={data} />
        </div>
      </Dialog>
      <DeleteDialog
        title="Deletar Tarefa"
        description={`O projeto ${taskName} será permanentemente excluída.`}
        isOpen={isDeleteTaskDialogOpen}
        setIsOpen={setIsDeleteTaskDialogOpen}
        deleteFunction={() =>
          deleteTask.mutateAsync(id).then(async () => {
            await queryClient.invalidateQueries({
              queryKey: ['get-incomplete-todos'],
            });
            await queryClient.invalidateQueries({
              queryKey: ['get-completed-todos'],
            });
            await queryClient.invalidateQueries({
              queryKey: ['get-today-todos'],
            });
            await queryClient.invalidateQueries({
              queryKey: ['get-incomplete-todos-by-project'],
            });
            await queryClient.invalidateQueries({
              queryKey: ['get-complete-todos-by-project'],
            });
          })
        }
      />
    </div>
  );
}
