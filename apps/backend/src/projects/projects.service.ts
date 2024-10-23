import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
