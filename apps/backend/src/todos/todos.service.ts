import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, userId: string) {
    const { projectId, labelId, parentId, ...todoData } = createTodoDto;

    if (projectId) {
      const project = await this.prisma.projects.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        return new NotFoundException(`Project with ID ${projectId} not found`);
      }
    }

    if (labelId) {
      const label = await this.prisma.labels.findUnique({
        where: { id: labelId },
      });

      if (!label) {
        return new NotFoundException(`Label with ID ${labelId} not found`);
      }
    }

    const todo = await this.prisma.todos.create({
      data: {
        ...todoData,
        userId,
        projectId: projectId,
        labelId: labelId,
        parentId: parentId,
      },
    });

    return todo;
  }

  async getInCompleteTodos(userId: string) {
    const todos = this.prisma.todos.findMany({
      omit: {
        userId: true,
      },
      where: {
        projectId: 1,
        userId: userId,
        isCompleted: false,
        parentId: null,
      },
      include: {
        subTodos: {
          include: {
            subTodos: {
              include: {
                subTodos: true,
              },
            },
          },
        },
      },
    });

    return todos;
  }

  async getCompletedTodos(userId: string) {
    const todos = this.prisma.todos.findMany({
      omit: {
        userId: true,
      },
      where: {
        projectId: 1,
        userId: userId,
        isCompleted: true,
        parentId: null,
      },
      include: {
        subTodos: {
          include: {
            subTodos: {
              include: {
                subTodos: true,
              },
            },
          },
        },
      },
    });

    return todos;
  }

  async getTodayTodos(userId: string) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59);

    const todos = this.prisma.todos.findMany({
      omit: {
        userId: true,
      },
      where: {
        userId: userId,
        dueDate: {
          gte: todayStart,
          lte: todayEnd,
        },
        parentId: null,
      },
      include: {
        subTodos: {
          include: {
            subTodos: {
              include: {
                subTodos: true,
              },
            },
          },
        },
      },
    });

    return todos;
  }

  async getOverdueTodos(userId: string) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0);

    const todos = await this.prisma.todos.findMany({
      where: {
        userId: userId,
        isCompleted: false,
        parentId: null,
        dueDate: {
          lt: todayStart,
        },
      },
      include: {
        subTodos: {
          include: {
            subTodos: {
              include: {
                subTodos: true,
              },
            },
          },
        },
      },
    });

    return todos;
  }

  async getInCompleteTodosByProject(userId: string, projectId: number) {
    const project = await this.prisma.projects.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const todos = this.prisma.todos.findMany({
      omit: {
        userId: true,
      },
      where: {
        userId: userId,
        isCompleted: false,
        projectId: projectId,
        parentId: null,
      },
      include: {
        subTodos: {
          include: {
            subTodos: {
              include: {
                subTodos: true,
              },
            },
          },
        },
      },
    });

    return todos;
  }

  async getCompleteTodosByProject(userId: string, projectId: number) {
    const project = await this.prisma.projects.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const todos = this.prisma.todos.findMany({
      omit: {
        userId: true,
      },
      where: {
        userId: userId,
        isCompleted: true,
        projectId: projectId,
        parentId: null,
      },
      include: {
        subTodos: {
          include: {
            subTodos: {
              include: {
                subTodos: true,
              },
            },
          },
        },
      },
    });

    return todos;
  }

  async findOne(userId: string, id: number) {
    const todo = this.prisma.todos.findFirst({
      omit: {
        userId: true,
      },
      where: {
        userId: userId,
        id,
      },
    });

    if (!todo) {
      return new NotFoundException('Todo not found');
    }

    return todo;
  }

  check(userId: string, id: number) {
    const todo = this.findOne(userId, id);

    if (todo instanceof NotFoundException) {
      return todo;
    }

    return this.prisma.todos.update({
      where: {
        userId: userId,
        id,
      },
      data: {
        isCompleted: true,
      },
    });
  }

  uncheck(userId: string, id: number) {
    const todo = this.findOne(userId, id);

    if (todo instanceof NotFoundException) {
      return todo;
    }

    return this.prisma.todos.update({
      where: {
        userId: userId,
        id,
      },
      data: {
        isCompleted: false,
      },
    });
  }
}
