import {
  Injectable,
  Logger,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateAuthLoginDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Cron } from '@nestjs/schedule';
import { CryptoService } from 'src/crypto/crypto.service';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { UserService } from 'src/user/user.service';
import { ResponseHandlerService } from 'src/response_handler/response_handler.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private usersService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  async login(createAuthDto: CreateAuthLoginDto) {
    let user = await this.usersService.findUserBy({
      email: createAuthDto.email,
    });

    //If no email found
    if (!user) {
      throw new UnauthorizedException({
        status: false,
        message: 'Invalid user or password',
      });
    }

    //validate password
    let passwordValidate = await this.cryptoService.decryptPassword(
      createAuthDto.password,
      user.password,
    );

    //If password not match
    if (!passwordValidate) {
      throw new UnauthorizedException({
        status: false,
        message: 'Invalid user or password',
      });
    }

    let token = await this.cryptoService.GenerateJWTToken(user.id);

    let data = {
      user: user,
      token: token,
    };
    return this.responseHandlerService.successResponse(
      'user login success',
      data,
    );
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  @Cron('0 * * * * *') // runs every one minute interval
  handleCron() {
    console.log('loggerrrr', new Date());
  }
}
