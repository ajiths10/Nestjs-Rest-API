import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllEventDto {
  @IsBoolean()
  is_featured: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;
}
