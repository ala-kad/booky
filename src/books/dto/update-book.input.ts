import { CreateBookInput } from './create-book.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateBookInput extends PartialType(CreateBookInput) {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;
}
