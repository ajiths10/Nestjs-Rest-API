import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminGuard } from './auth/auth-admin.guard';
import { User } from './auth/auth-user.decorator';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  getHelloProtected(@Request() req): string {
    return this.appService.getHelloProtected(req.user);
  }

  @Post('/protected')
  @UseGuards(JwtAuthGuard)
  getUserProtected(@User() user) {
    return this.appService.GetUserProtected(user);
  }

  //admin only can access route
  @Post('/protected/admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  AdminProtected(@User() user) {
    return this.appService.AdminProtected(user);
  }
}
