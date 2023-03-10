import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('logout')
  // logout(@Body() dto: AuthDto) {
  //   return this.authService.logout(dto);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Post('refresh')
  // refresh(@Body() dto: AuthDto) {
  //   return this.authService.refresh(dto);
  // }
}
