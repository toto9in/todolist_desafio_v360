import { useToast } from '@/hooks/use-toast';
import {
  IResultGetTodos,
  IResultTodos,
} from '@/resources/interfaces/result-get-todos.interface';
import Task from './task';
import {
  useSetCheckTodo,
  useSetUncheckTodo,
} from '@/resources/hooks/todo.hooks';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ToastAction } from '../ui/toast';

interface TodoItemProps {
  items: IResultGetTodos;
}

export default function TodosItem({ items }: TodoItemProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uncheckTodo = useSetUncheckTodo();
  const checkTodo = useSetCheckTodo();

  const invalidateTodoQueries = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['get-incomplete-todos'] });
    await queryClient.invalidateQueries({ queryKey: ['get-completed-todos'] });
  }, [queryClient]);

  const handleOnChangeTodo = useCallback(
    async (task: IResultTodos) => {
      if (task.isCompleted) {
        await uncheckTodo.mutateAsync(task.id).then(async () => {
          await invalidateTodoQueries();
        });
      } else {
        await checkTodo.mutateAsync(task.id).then(async () => {
          toast({
            title: '1 Tarefa concluída',
            duration: 5000,
            action: (
              <ToastAction
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() =>
                  uncheckTodo.mutateAsync(task.id).then(async () => {
                    await invalidateTodoQueries();
                  })
                }
                altText="Desfazer"
              >
                <span className="text-sm font-bold">Desfazer</span>
              </ToastAction>
            ),
          });
          await invalidateTodoQueries();
        });
      }
    },
    [uncheckTodo, checkTodo, toast, queryClient]
  );

  return items?.map((task) => (
    <Task
      key={task.id}
      data={task}
      isCompleted={task.isCompleted}
      handleOnChange={() => handleOnChangeTodo(task)}
    />
  ));
}
