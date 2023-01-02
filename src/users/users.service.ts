import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.users.findMany({});
  }

  async findOne(id: number) {
    const findUser = await this.prisma.users.findUnique({
      where: {
        Id: id,
      },
    });
    if (!findUser) {
      throw new NotFoundException(`Id ${id} not found `);
    } else {
      return findUser;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateuser = await this.prisma.users.update({
      where: {
        Id: id,
      },
      data: updateUserDto,
    });

    return updateuser;
  }

  async remove(id: number) {
    return await `This action removes a #${id} user`;
  }
}
