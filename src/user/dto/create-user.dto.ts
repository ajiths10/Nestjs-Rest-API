import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  age: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
