import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  Role: string;
  @IsNotEmpty()
  password: string;
  id: number;
}
