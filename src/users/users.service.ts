import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // ctx = host.switchToHttp();
  constructor(private prisma: PrismaService) {}

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
}
