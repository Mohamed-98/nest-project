import { PartialType } from '@nestjs/mapped-types';
import { AuthDto } from 'src/auth/dto';
// import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(AuthDto) {}
