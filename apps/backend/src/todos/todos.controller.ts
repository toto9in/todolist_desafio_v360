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
import { UpdateTodoDto } from './dto/update-todo.dto';
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
    console.log(user);
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

  @Get(':id')
  findOne(
    @GetUser() user: GoogleLoginUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.findOne(user.email, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
