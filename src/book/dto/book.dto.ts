import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
export class BookDto {
  @ApiProperty({ description: 'Book title', required: true, maxLength: 256 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256, { message: 'Title is too long' })
  readonly title: string;

  @ApiProperty({
    description: 'Book description',
    required: true,
    maxLength: 2048,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2048, { message: 'Description is too long' })
  readonly description: string;

  @ApiProperty({
    description: 'Book authors. List of all authors of the book.',
    required: true,
    minimum: 1,
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  readonly authors: string[];
}
