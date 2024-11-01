import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../guards/http-jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: { userId: string },
  ) {
    return this.projectsService.create(createProjectDto, user.userId);
  }

  @Get()
  getAll(@GetUser() user: { userId: string }) {
    return this.projectsService.getAllProjects(user.userId);
  }

  @Get('projects-page')
  getProjectsForProjectsPage(@GetUser() user: { userId: string }) {
    return this.projectsService.getProjectsForProjectsPage(user.userId);
  }

  @Get(':id')
  getById(
    @GetUser() user: { userId: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.getById(user.userId, id);
  }

  @Delete(':id')
  delete(
    @GetUser() user: { userId: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.delete(user.userId, id);
  }
}
