import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  // ctx = host.switchToHttp();
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    // generate the password hash
    const hash = await argon.hash(createUserDto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.users.create({
        data: {
          ...createUserDto,
          password: hash,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: CreateUserDto) {
    // find the user by id
    const user = await this.prisma.users.findUnique({
      where: {
        id: dto.id,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(dto.password, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.password);
  }

  async findAll() {
    return await this.prisma.users.findMany({});
  }

  async findOne(id: number) {
    const findUser = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    if (findUser === null) {
      throw new NotFoundException(`Id ${id} not found `);
    } else {
      return findUser;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updateuser = await this.prisma.users.update({
        where: {
          id: id,
        },
        data: updateUserDto,
      });
      return updateuser;
    } catch (error) {
      throw new NotFoundException(`user ${id} not found `);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.users.delete({
        where: {
          id: id,
        },
      });
      return 'user deleted';
    } catch (error) {
      throw new NotFoundException(`user ${id} not found `);
    }
  }
  async signToken(
    userId: number,
    password: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      password,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
