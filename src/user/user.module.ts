import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { CutomUsers } from './entities/customusers.entity';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [CryptoModule, TypeOrmModule.forFeature([Users, CutomUsers])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
