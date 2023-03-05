import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user.entity';
import { Event } from './entities/event.entity';
import { ResponseHandlerModule } from 'src/response_handler/response_handler.module';

@Module({
  imports: [ResponseHandlerModule, TypeOrmModule.forFeature([Users, Event])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
