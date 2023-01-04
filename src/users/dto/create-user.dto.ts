import { IsHash, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fname: string;
  @IsNotEmpty()
  lname: string;
  @IsNotEmpty()
  Role: string;
  // @IsHash()
  password: string;
}
