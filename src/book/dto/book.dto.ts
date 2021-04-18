import { IsNotEmpty, MaxLength } from 'class-validator';
export class BookDto {
  @IsNotEmpty()
  @MaxLength(256, { message: 'Title is too long' })
  readonly title: string;

  @IsNotEmpty()
  @MaxLength(2048, { message: 'Description is too long' })
  readonly description: string;
}
