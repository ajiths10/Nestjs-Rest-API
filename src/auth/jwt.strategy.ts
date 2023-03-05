import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
      ignoreExpiration: false,
    }); //config
  }

  async validate(payload: { id: number }) {
    const user = await this.userService.findUserBy({ id: payload.id });

    if (!user) {
      throw new UnauthorizedException({
        status: false,
        message: 'Invalid user or token',
      });
    }

    return user;
  }
}
