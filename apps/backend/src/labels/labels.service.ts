import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LabelProjectsType } from '@prisma/client';

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLabelDto: CreateLabelDto) {
    return 'This action adds a new label';
  }

  async getAllLabels(userId: string) {
    const systemLabels = this.getSystemLabels();
    const userLabels = this.getUserLabels(userId);

    const [systemLabelsResult, userLabelsResult] = await Promise.all([
      systemLabels,
      userLabels,
    ]);

    const projects = [...systemLabelsResult, ...userLabelsResult];

    return projects;
  }

  async getSystemLabels() {
    return this.prisma.labels.findMany({
      where: {
        type: LabelProjectsType.SYSTEM,
      },
    });
  }

  async getUserLabels(userId: string) {
    return this.prisma.labels.findMany({
      where: {
        type: LabelProjectsType.USER,
        userId: userId,
      },
    });
  }

  async getById(userId: string | null, id: number) {
    const label = await this.prisma.labels.findFirst({
      where: {
        id: id,
        OR: [{ userId: null }, { userId: userId }],
      },
    });

    if (!label) {
      return new NotFoundException(`Label with ID ${id} not found`);
    }

    return label;
  }
}
