'use client';
import { getTodoApiClientSide } from '../get-todo-api-client-side';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICreateTaskDto } from '../interfaces/create-task-dto.interface';

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

export const useGetTodayTodos = () => {
  return useQuery({
    queryKey: ['get-today-todos'],
    queryFn: async () => {
      return await todoApi.getTodayTodos();
    },
  });
};

export const useGetOverdueTodos = () => {
  return useQuery({
    queryKey: ['get-overdue-todos'],
    queryFn: async () => {
      return await todoApi.getOverdueTodos();
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

export const useGetProjects = () => {
  return useQuery({
    queryKey: ['get-projects'],
    queryFn: async () => {
      return await todoApi.getProjects();
    },
  });
};

export const useGetProjectById = (id: number | null) => {
  return useQuery({
    queryKey: ['get-project-by-id', id],
    queryFn: async ({ queryKey }) => {
      const [, projectId] = queryKey;
      return await todoApi.getProjectById(projectId as number);
    },
  });
};

export const useGetLabels = () => {
  return useQuery({
    queryKey: ['get-labels'],
    queryFn: async () => {
      return await todoApi.getLabels();
    },
  });
};

export const useGetLabelById = (id: number | null) => {
  return useQuery({
    queryKey: ['get-label-by-id', id],
    queryFn: async ({ queryKey }) => {
      const [, labelId] = queryKey;
      return await todoApi.getLabelById(labelId as number);
    },
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationKey: ['create-task'],
    mutationFn: async (task: ICreateTaskDto) => {
      return await todoApi.createTask(task);
    },
  });
};
