import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QueryDto {
  @IsNotEmpty()
  @ApiProperty({
    description:
      'Text that we want to search books with. We will search next fields: title, description and authors',
    required: true,
  })
  readonly query: string;
}
