import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHandlerService } from 'src/response_handler/response_handler.service';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { FindAllEventDto } from './dto/find-all-events.dto';
import { GetOneEventDto } from './dto/getone-event-dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    private readonly reaponseService: ResponseHandlerService,
  ) {}

  async create(createEventDto: CreateEventDto, user: any) {
    let newEvent = new Event();

    newEvent.title = createEventDto.title;
    newEvent.description = createEventDto.description;
    newEvent.image = createEventDto.image;
    newEvent.location = createEventDto.location;
    newEvent.date = createEventDto.date;
    newEvent.is_featured = createEventDto.is_featured;
    newEvent.created_at = new Date();
    newEvent.user = user;
    let res = await this.eventsRepository.save(newEvent);
    return this.reaponseService.successResponse('event added success!', res);
  }

  async findAll(findAllEventDto: FindAllEventDto) {
    let where = {
      where: {
        ...findAllEventDto.filter,
      },
      take: findAllEventDto.limit,
      skip: findAllEventDto.page,
    };
    let evensts = await this.eventsRepository.find(where);

    return this.reaponseService.successResponse(
      'Events fetch success',
      evensts,
    );
  }

  async findOne(id: number) {
    let data = await this.eventsRepository.findBy({ id });
    if (!data.length) {
      throw new NotFoundException();
    }

    return this.reaponseService.successResponse('Event fetched', data);
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
