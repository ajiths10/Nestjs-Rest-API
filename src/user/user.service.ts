import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const current_dateTime = new Date();

    const newUser = this.userRepository.create({
      ...createUserDto,
      created_at: current_dateTime,
    });

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({
      where: {
        is_active: 1,
      },
      take: 10,
      order: {
        // username: "DESC",
        id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
        is_active: 1,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDto });
  }

  remove(id: number) {
    // return this.userRepository.delete({ id }); // delete user where id == id

    return this.userRepository.update({ id }, { is_active: 0 }); // instead of deleting change the is_active flag to zero
  }
}
