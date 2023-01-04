import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fname: string;
  @IsNotEmpty()
  lname: string;
  @IsNotEmpty()
  Role: string;
  @IsNotEmpty()
  password: string;
}
