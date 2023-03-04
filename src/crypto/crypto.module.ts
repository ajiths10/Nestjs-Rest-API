import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from './crypto.service';

@Module({
  imports: [ConfigModule, JwtModule, TypeOrmModule.forFeature([])],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
