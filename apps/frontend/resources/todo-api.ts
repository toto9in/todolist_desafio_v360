import axios, { AxiosInstance } from 'axios';
import { IResultGetTodos } from './interfaces/result-get-todos.interface';

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

  async addTodo(todo: any) {
    return this.axiosInstance.post('/todos', todo);
  }
}
