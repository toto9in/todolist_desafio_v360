import axios, { AxiosInstance } from 'axios';
import { IResultGetTodos } from './interfaces/result-get-todos.interface';
import {
  IResultGetProjects,
  IResultProject,
} from './interfaces/result-get-projects.interface';
import {
  IResultGetLabels,
  IResultLabel,
} from './interfaces/result-get-labels.interface';
import { ICreateTaskDto } from './interfaces/create-task-dto.interface';

export class TodoApi {
  readonly axiosInstance: AxiosInstance;

  constructor(getToken: () => Promise<string>) {
    const baseURL = process.env.NEXT_PUBLIC_TODO_API_URL;

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getTodos() {
    try {
      const { data } = await this.axiosInstance.get<IResultGetTodos>(`todos`);
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async getIncompleteTodos() {
    try {
      const { data } =
        await this.axiosInstance.get<IResultGetTodos>(`todos/incomplete`);
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async getCompletedTodos() {
    try {
      const { data } =
        await this.axiosInstance.get<IResultGetTodos>(`todos/completed`);
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async getTodayTodos() {
    try {
      const { data } =
        await this.axiosInstance.get<IResultGetTodos>(`todos/today`);
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async getOverdueTodos() {
    try {
      const { data } =
        await this.axiosInstance.get<IResultGetTodos>(`todos/overdue`);
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async checkTodo(id: number) {
    try {
      await this.axiosInstance.patch(`todos/${id}/check`);
    } catch (error) {
      console.error('Error checking todo:', error);
      throw error;
    }
  }

  async uncheckTodo(id: number) {
    try {
      await this.axiosInstance.patch(`todos/${id}/uncheck`);
    } catch (error) {
      console.error('Error unchecking todo:', error);
      throw error;
    }
  }

  async getIncompleteTodosByProject(projectId: number) {
    try {
      const { data } = await this.axiosInstance.get<IResultGetTodos>(
        `todos/project/${projectId}/incomplete`
      );
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async getCompleteTodosByProject(projectId: number) {
    try {
      const { data } = await this.axiosInstance.get<IResultGetTodos>(
        `todos/project/${projectId}/complete`
      );
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async createProject(name: string) {
    try {
      await this.axiosInstance.post('projects', { name });
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async getProjects() {
    try {
      const { data } =
        await this.axiosInstance.get<IResultGetProjects>(`projects`);
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  async getProjectById(id: number | null) {
    try {
      if (!id) {
        return null;
      }

      const { data } = await this.axiosInstance.get<IResultProject>(
        `projects/${id}`
      );
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  async getProjectsForProjectsPage() {
    try {
      const { data } = await this.axiosInstance.get<IResultGetProjects>(
        `projects/projects-page`
      );
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  async deleteProject(id: number) {
    try {
      await this.axiosInstance.delete(`projects/${id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  async getLabels() {
    try {
      const { data } = await this.axiosInstance.get<IResultGetLabels>(`labels`);
      return data;
    } catch (error) {
      console.error('Error fetching labels:', error);
      throw error;
    }
  }

  async getLabelById(id: number | null) {
    try {
      if (!id) {
        return null;
      }

      const { data } = await this.axiosInstance.get<IResultLabel>(
        `labels/${id}`
      );
      return data;
    } catch (error) {
      console.error('Error fetching labels:', error);
      throw error;
    }
  }

  async createTask(createTaskDto: ICreateTaskDto) {
    return this.axiosInstance.post('todos', createTaskDto);
  }

  async deleteTask(id: number) {
    try {
      await this.axiosInstance.delete(`todos/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}
