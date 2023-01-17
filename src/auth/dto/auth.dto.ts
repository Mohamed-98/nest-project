import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  Role: string;
  @IsNotEmpty()
  hash: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  id: number;
}
