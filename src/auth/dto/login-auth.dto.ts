import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
