'use client';
import {
  useGetIncompleteTodos,
  useGetCompletedTodos,
} from '@/resources/hooks/todo.hooks';
import TodosItem from './todo-item';
import { AddTaskWrapper } from './add-task-button';

export default function TodoList() {
  const { data: incompleteTodosData, isLoading: isIncompleteTodosLoading } =
    useGetIncompleteTodos();

  const { data: completedTodosData, isLoading: isCompletedTodosLoading } =
    useGetCompletedTodos();

  if (isIncompleteTodosLoading || isCompletedTodosLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xl:px-60 h-full w-full pt-8 flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Entrada</h1>
      </div>
      <div className="w-full  flex flex-col gap-1 py-4">
        <TodosItem items={incompleteTodosData || []} />
      </div>
      <AddTaskWrapper />
      <div className="w-full flex flex-col gap-1 py-4">
        <TodosItem items={completedTodosData || []} />
      </div>
      <div className="flex flex-col gap-1 py-4"></div>
    </div>
  );
}
