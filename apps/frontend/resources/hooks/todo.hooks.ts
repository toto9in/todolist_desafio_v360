'use client';
import { getTodoApiClientSide } from '../get-todo-api-client-side';
import { useMutation, useQuery } from '@tanstack/react-query';

const todoApi = getTodoApiClientSide();

export const useGetIncompleteTodos = () => {
  return useQuery({
    queryKey: ['get-incomplete-todos'],
    queryFn: async () => {
      return await todoApi.getIncompleteTodos();
    },
  });
};

export const useGetCompletedTodos = () => {
  return useQuery({
    queryKey: ['get-completed-todos'],
    queryFn: async () => {
      return await todoApi.getCompletedTodos();
    },
  });
};

export const useSetCheckTodo = () => {
  return useMutation({
    mutationKey: ['set-check-todo'],
    mutationFn: async (id: number) => {
      return await todoApi.checkTodo(id);
    },
  });
};

export const useSetUncheckTodo = () => {
  return useMutation({
    mutationKey: ['set-uncheck-todo'],
    mutationFn: async (id: number) => {
      return await todoApi.uncheckTodo(id);
    },
  });
};
