import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} label`;
  }

  update(id: number, updateLabelDto: UpdateLabelDto) {
    return `This action updates a #${id} label`;
  }

  remove(id: number) {
    return `This action removes a #${id} label`;
  }
}
