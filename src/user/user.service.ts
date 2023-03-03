import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/crypto/crypto.service';
import { ResponseHandlerService } from 'src/response_handler/response_handler.service';
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
    private readonly cUserRepository: Repository<CutomUsers>,
    private readonly cryptoService: CryptoService,
    private readonly responseService: ResponseHandlerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const checkUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (checkUser) {
        return new ConflictException({
          status: false,
          message: 'user already exists',
        });
      }
      let hash = await this.cryptoService.encryptPassword(
        createUserDto.password,
      );
      const current_dateTime = new Date();

      //users table entry
      const newUser = new Users();
      newUser.email = createUserDto.email;
      newUser.first_name = createUserDto.first_name;
      newUser.last_name = createUserDto.last_name;
      newUser.created_at = current_dateTime;
      newUser.password = hash as string;

      //custom users table entry
      let res = await this.userRepository.save(newUser);
      const customuser = new CutomUsers();
      customuser.age = createUserDto.age;
      customuser.user = res;

      let cuserRes = await this.cUserRepository.save(customuser);
      delete cuserRes.user.password;

      return this.responseService.successResponse(
        'User signup completed, Please login to continue.',
        cuserRes,
      );
    } catch (error) {
      console.log(error.message);
      return this.responseService.errorResponse(error.message);
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
    return this.cUserRepository.findOne({
      where: { id },
      relations: ['user'],
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
