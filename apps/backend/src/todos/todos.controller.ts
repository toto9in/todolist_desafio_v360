import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from '../guards/http-jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { GoogleLoginUserDto } from '../auth/dto/google-login.dto';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: { userId: string },
  ) {
    return this.todosService.create(createTodoDto, user.userId);
  }

  @Get('incomplete')
  getInComplete(@GetUser() user: { userId: string }) {
    return this.todosService.getInCompleteTodos(user.userId);
  }

  @Get('completed')
  getCompleted(@GetUser() user: { userId: string }) {
    return this.todosService.getCompletedTodos(user.userId);
  }

  @Get('today')
  getToday(@GetUser() user: { userId: string }) {
    return this.todosService.getTodayTodos(user.userId);
  }

  @Get('overdue')
  getOverdueTodos(@GetUser() user: { userId: string }) {
    return this.todosService.getOverdueTodos(user.userId);
  }

  @Get(':id')
  findOne(
    @GetUser() user: { userId: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.findOne(user.userId, id);
  }

  @Get('project/:projectId')
  getTodosByProject(
    @GetUser() user: { userId: string },
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.todosService.getTodosByProject(user.userId, projectId);
  }

  @Patch(':id/check')
  checkTodo(
    @GetUser() user: GoogleLoginUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.check(user.email, id);
  }

  @Patch(':id/uncheck')
  uncheckTodo(
    @GetUser() user: GoogleLoginUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.uncheck(user.email, id);
  }
}
