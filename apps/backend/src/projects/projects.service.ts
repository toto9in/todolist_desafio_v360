import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LabelProjectsType } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async getAllProjects(userId: string) {
    const systemProjects = this.getSystemProjects();
    const userProjects = this.getUserProjects(userId);

    const [systemProjectsResult, userProjectsResult] = await Promise.all([
      systemProjects,
      userProjects,
    ]);

    const projects = [...systemProjectsResult, ...userProjectsResult];

    return projects;
  }
  async getSystemProjects() {
    return this.prisma.projects.findMany({
      where: {
        type: LabelProjectsType.SYSTEM,
      },
    });
  }

  async getUserProjects(userId: string) {
    return this.prisma.projects.findMany({
      where: {
        type: LabelProjectsType.USER,
        userId: userId,
      },
    });
  }

  async getProjectsForProjectsPage(userId: string) {
    const systemProjects = await this.getSystemProjects();
    const userProjects = await this.getUserProjects(userId);

    const systemProjectsWithoutInbox = systemProjects.filter(
      (project) => project.name !== 'Inbox',
    );

    const projects = [...systemProjectsWithoutInbox, ...userProjects];

    return projects;
  }

  async getById(userId: string | null, id: number) {
    const project = await this.prisma.projects.findFirst({
      where: {
        id: id,
        OR: [{ userId: null }, { userId: userId }],
      },
    });

    if (!project) {
      return new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
