import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { CutomUsers } from './entities/customusers.entity';
import { CryptoModule } from 'src/crypto/crypto.module';
import { ResponseHandlerModule } from 'src/response_handler/response_handler.module';
import { Event } from 'src/event/entities/event.entity';

@Module({
  imports: [
    CryptoModule,
    ResponseHandlerModule,
    TypeOrmModule.forFeature([Users, CutomUsers, Event]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
