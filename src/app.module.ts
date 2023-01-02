import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: '123456789',
//       database: 'nestjs',
//       entities: [],
//       synchronize: true,
//     }),
//     UsersModule,
//   ],
//   controllers: [AppController, UsersController],
//   providers: [AppService, UsersService],
// })
export class AppModule {}
