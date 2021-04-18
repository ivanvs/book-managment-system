import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
export class BookDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256, { message: 'Title is too long' })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2048, { message: 'Description is too long' })
  readonly description: string;

  @IsArray()
  @ArrayMinSize(1)
  readonly authors: string[];
}
