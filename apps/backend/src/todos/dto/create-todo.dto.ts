import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsNumber()
  @IsOptional()
  projectId: number | null;

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

  @IsNumber()
  @IsOptional()
  labelId: number | null;

  @IsNumber()
  @IsOptional()
  parentId: number | null;
}
