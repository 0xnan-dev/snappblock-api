import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_EXPIRATION, JWT_SECRET_KEY } from '../constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService, JwtStrategy } from './jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET_KEY),
        signOptions: { expiresIn: configService.get<string>(JWT_EXPIRATION) },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
