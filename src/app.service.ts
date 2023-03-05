import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloProtected(user): any {
    return { message: 'Hello User!', data: user };
  }

  GetUserProtected(user): any {
    return { message: 'Happy User!', data: user };
  }

  AdminProtected(user): any {
    return { message: 'Hello admin User!', data: user };
  }
}
