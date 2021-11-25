import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AccessTokenPayload, JwtAccessToken, Token } from '../interfaces';

@Injectable()
export class JwtService {
  private readonly logger = new Logger(JwtService.name);

  constructor(
    private readonly nestJwt: NestJwtService,
    private readonly configService: ConfigService
  ) {}

  public decodeAccessToken(accessToken: string): JwtAccessToken {
    this.logger.log('decodeAccessToken');

    return this.nestJwt.decode(accessToken) as JwtAccessToken;
  }

  public verifyAccessToken(accessToken: string): JwtAccessToken {
    this.logger.log('verifyAccessToken');

    return this.nestJwt.verify<JwtAccessToken>(accessToken);
  }

  public async generateTokens({ publicKey, signature, roles }: AccessTokenPayload): Promise<Token> {
    this.logger.log('generateTokens');

    const accessToken = this.signAccessToken({ publicKey, signature, roles });

    return {
      accessToken: accessToken,
      expiresIn: this.configService.get<string>('jwtExpiresIn'),
    };
  }

  private signAccessToken({ publicKey, roles }: AccessTokenPayload) {
    this.logger.log('signAccessToken');

    const expiresIn = this.configService.get<number>('jwtExpiresIn');

    return this.nestJwt.sign(
      {
        sub: publicKey,
        roles,
      },
      {
        expiresIn,
      }
    );
  }
}
