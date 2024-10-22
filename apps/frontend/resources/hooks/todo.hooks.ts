'use client';
import { getTodoApiClientSide } from '../get-todo-api-client-side';
import { useQuery } from '@tanstack/react-query';

const todoApi = getTodoApiClientSide();

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['get-todos'],
    queryFn: async () => {
      return await todoApi.getTodos();
    },
    refetchOnWindowFocus: false,
  });
};
