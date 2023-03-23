import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      let res = await this.userService.create(createUserDto);
      return res;
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      let res = await this.userService.findAll();
      return res;
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      let res: any = await this.userService.findOne(+id);
      console.log(res);
      if (res) {
        return res;
      } else {
        throw new Error('No user id found!!');
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      let res: any = await this.userService.update(+id, updateUserDto);
      console.log(res);
      if (res) {
        return res;
      } else {
        throw new Error('No user id found!!');
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      let res: any = this.userService.remove(+id);
      console.log(res);
      if (res) {
        return res;
      } else {
        throw new Error('No user id found!!');
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Post('password')
  passwordGenerate() {
    this.userService.passwordGenerate();
  }
}
