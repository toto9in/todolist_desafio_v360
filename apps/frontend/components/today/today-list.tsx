'use client';
import {
  useGetOverdueTodos,
  useGetTodayTodos,
} from '@/resources/hooks/todo.hooks';
import TodosItem from '../todos-components/todo-item';
import { AddTaskWrapper } from '../todos-components/add-task-button';
import moment from 'moment';
import { Dot } from 'lucide-react';

export default function TodayList() {
  const { data: todayTodosData, isLoading: isTodayTodosLoading } =
    useGetTodayTodos();

  const { data: overdueTodosData, isLoading: isOverdueTodosLoading } =
    useGetOverdueTodos();

  if (isTodayTodosLoading || isOverdueTodosLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xl:px-60 h-full w-full pt-8 flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Hoje</h1>
      </div>
      {!overdueTodosData && (
        <div className="w-full flex flex-col gap-1 py-4">
          <p className="font-bold flex text-sm">Atrasadas</p>
          <TodosItem items={overdueTodosData || []} />
        </div>
      )}
      <div className="w-full flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm items-center border-b-2 p-2 border-gray-100">
          {moment(new Date()).format('LL')}
          <Dot />
          Hoje
          <Dot />
          {moment(new Date()).format('dddd')}
        </p>
        <TodosItem items={todayTodosData || []} />
      </div>
      <AddTaskWrapper />
      <div className="flex flex-col gap-1 py-4"></div>
    </div>
  );
}
