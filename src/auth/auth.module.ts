import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CryptoModule } from 'src/crypto/crypto.module';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { UserModule } from 'src/user/user.module';
import { ResponseHandlerModule } from 'src/response_handler/response_handler.module';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    CryptoModule,
    ResponseHandlerModule,
    PassportModule,
    ScheduleModule.forRoot(),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
