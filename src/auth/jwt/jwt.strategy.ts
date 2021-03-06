import { forwardRef, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService, JwtAccessToken } from '..';
import { UserInfo } from '../interfaces/user-info.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @Inject(forwardRef(() => AuthService))
    public readonly authService: AuthService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwtSecretKey'),
    });
  }

  public async validate(payload: JwtAccessToken): Promise<UserInfo> {
    const { sub, signature, roles } = payload;

    this.logger.verbose('validate', payload);

    const valid = this.authService.validate(sub, signature);

    if (!valid) {
      throw new UnauthorizedException();
    }

    return {
      publicKey: sub,
      roles,
    };
  }
}
