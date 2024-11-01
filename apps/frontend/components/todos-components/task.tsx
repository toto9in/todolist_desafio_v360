import clsx from 'clsx';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { GitBranch } from 'lucide-react';

import { IResultTodos } from '@/resources/interfaces/result-get-todos.interface';
import TaskDialog from './task-dialog';

// function isSubTodo(
//   data: Doc<'todos'> | Doc<'subTodos'>
// ): data is Doc<'subTodos'> {
//   return 'parentId' in data;
// }

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
  const { taskName, description } = data;

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
          <TaskDialog data={data} />
        </div>
      </Dialog>
    </div>
  );
}
