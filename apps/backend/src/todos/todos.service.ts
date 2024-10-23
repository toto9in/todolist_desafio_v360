import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, userId: string) {
    const { projectId, labelsIds, ...todoData } = createTodoDto;

    if (projectId) {
      const project = await this.prisma.projects.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        return new NotFoundException(`Project with ID ${projectId} not found`);
      }
    }

    // TODO: verificar se todos os labelsIds existem
    // se tiver labelsIds, verificar se todas as labels existem, se não existir, retornar erro

    const todo = await this.prisma.todos.create({
      data: {
        ...todoData,
        userId,
        project: projectId ? { connect: { id: projectId } } : undefined,
        labels: labelsIds
          ? { connect: labelsIds.map((id) => ({ id })) }
          : undefined,
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
        userId: userId,
        isCompleted: false,
        parentId: null,
      },
      include: {
        subTodos: true,
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
        userId: userId,
        isCompleted: true,
        parentId: null,
      },
      include: {
        subTodos: true,
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

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
