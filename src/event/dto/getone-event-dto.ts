import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetOneEventDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
