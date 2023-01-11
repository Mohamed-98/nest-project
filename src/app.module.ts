import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './users/strategy';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],

  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService, JwtStrategy],
})
export class AppModule {}
