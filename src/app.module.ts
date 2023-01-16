import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategy';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],

  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule {}
