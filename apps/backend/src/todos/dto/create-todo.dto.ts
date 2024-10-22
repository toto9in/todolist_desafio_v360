import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsNumber()
  @IsOptional()
  projectId: number;

  @IsString()
  @IsNotEmpty()
  taskName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @IsString()
  @IsOptional()
  priority: string;

  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @IsOptional()
  labelsIds: number[];
}
