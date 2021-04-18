import { IsNotEmpty } from 'class-validator';

export class QueryDto {
  @IsNotEmpty()
  readonly query: string;
}
