import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CutomUsers } from './entities/customusers.entity';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(CutomUsers)
    private cUserRepository: Repository<CutomUsers>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const current_dateTime = new Date();

      const newUser = this.userRepository.create({
        email: createUserDto.email,
        username: createUserDto.username,
        created_at: current_dateTime,
      });

      let res = await this.userRepository.save(newUser);
      console.log(res);
      const customuser = this.cUserRepository.create({
        user_id: res.id,
        firstname: createUserDto.firstname,
        lastname: createUserDto.lastname,
        age: createUserDto.age,
      });
      await this.cUserRepository.save(customuser);
      newUser.custom_user = customuser;
      return this.userRepository.save(newUser);
    } catch (error) {
      console.log(error.message);
      return;
    }
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
      where: { id },
      relations: ['custom_user'],
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
