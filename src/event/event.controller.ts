import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/auth-user.decorator';
import { FindAllEventDto } from './dto/find-all-events.dto';
import { AdminGuard } from 'src/auth/auth-admin.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createEventDto: CreateEventDto, @User() User) {
    return this.eventService.create(createEventDto, User);
  }

  @Post('/all')
  findAll(@Body() findAllEventDto: FindAllEventDto) {
    return this.eventService.findAll(findAllEventDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
