import clsx from 'clsx';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { Calendar, GitBranch } from 'lucide-react';
import moment from 'moment';
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
  showDetails = false,
}: {
  data: IResultTodos;
  isCompleted: boolean;
  handleOnChange: () => void;
  showDetails?: boolean;
}) {
  const { taskName, dueDate } = data;

  return (
    <div
      key={data.id}
      className="w-full flex-row items-center space-x-2 border-b-2 p-2 border-gray- animate-in fade-in"
    >
      <Dialog>
        <div className="flex gap-2 items-center justify-end w-full">
          <div className="flex gap-2 w-full items-center">
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
                  {taskName}
                </button>
                {showDetails && (
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center gap-1">
                      <GitBranch className="w-3 h-3 text-foreground/70" />
                      <p className="text-xs text-foreground/70"></p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      <p className="text-xs text-primary">
                        {moment(dueDate).format('LL')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogTrigger>
          </div>
          <TaskDialog data={data} />
        </div>
      </Dialog>
    </div>
  );
}
