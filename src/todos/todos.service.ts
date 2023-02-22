import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Users } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const current_dateTime = new Date();
    try {
      let user = await this.userRepository.findBy({
        id: createTodoDto.user_id,
      });

      let res = this.todoRepository.create({
        todo: createTodoDto.todo,
        created_at: current_dateTime,
        user: user[0],
      });

      return this.todoRepository.save(res);
    } catch (error) {
      return error.message;
    }
  }

  findAll(user: Users) {
    try {
      return this.todoRepository.find();
    } catch (error) {
      return error.message;
    }
  }

  findOne(id: number) {
    try {
      return this.todoRepository.findOne({
        where: { id },
        relations: ['user'],
      });
    } catch (error) {
      return error.message;
    }
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
