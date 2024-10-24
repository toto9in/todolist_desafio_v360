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
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { JwtAuthGuard } from 'src/guards/http-jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('labels')
@UseGuards(JwtAuthGuard)
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelsService.create(createLabelDto);
  }

  @Get()
  getAll(@GetUser() user: { userId: string }) {
    return this.labelsService.getAllLabels(user.userId);
  }

  @Get(':id')
  getById(
    @GetUser() user: { userId: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.labelsService.getById(user.userId, id);
  }
}
