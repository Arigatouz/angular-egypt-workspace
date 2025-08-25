import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name',
    example: 'E-commerce Website',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'A modern e-commerce platform built with React and Node.js',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Project status',
    example: 'In Progress',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  status?: string;

  @ApiProperty({
    description: 'Project start date',
    example: '2024-01-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'Project end date',
    example: '2024-06-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    description: 'User ID who owns this project',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
