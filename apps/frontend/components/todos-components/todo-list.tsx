'use client';
import { useGetTodos } from '@/resources/hooks/todo.hooks';
import { Checkbox } from '../ui/checkbox';

export default function TodoList() {
  const {
    data: todosData,
    refetch: refetchTodos,
    isLoading: isTodosLoading,
  } = useGetTodos();

  if (isTodosLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xl:px-60 h-full w-full pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Entrada</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <div className="flex items-center space-x-2">
          {todosData?.map(({ taskName }, index) => (
            <div key={index}>
              <Checkbox className="rounded-full" id={`todo-${index}`} />
              <label
                htmlFor={`todo-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-aloowed peer-disabled:opacity-70"
              >
                {taskName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
