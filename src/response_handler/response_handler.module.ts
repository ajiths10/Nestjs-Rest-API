import { Module } from '@nestjs/common';
import { ResponseHandlerService } from './response_handler.service';

@Module({
  providers: [ResponseHandlerService],
  exports: [ResponseHandlerService],
})
export class ResponseHandlerModule {}
