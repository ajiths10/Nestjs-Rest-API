export class CreateUserDto {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  age?: number;
  password: string;
}
