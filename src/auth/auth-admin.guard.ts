import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: any = context
      .switchToHttp()
      .getRequest<import('express').Request>();

    return req?.user.is_admin ? true : false;
  }
}
