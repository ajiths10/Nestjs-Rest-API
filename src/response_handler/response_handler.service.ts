import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHandlerService {
  successResponse(message: string, data?: any) {
    return {
      status: true,
      message,
      data,
    };
  }

  errorResponse(message: string) {
    return {
      status: false,
      message,
    };
  }
}
