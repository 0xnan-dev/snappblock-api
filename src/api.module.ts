import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccessControlModule } from 'nest-access-control';
import { LoggerModule } from 'nestjs-pino';
import { roles } from './api.roles';
import { AuthModule } from './auth/auth.module';
import { configFactory, configSchema } from './config/configuration';
import { LegacySystemModule } from './legacy-system';
import { PingController } from './ping/ping.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AccessControlModule.forRoles(roles),
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configSchema,
      load: [configFactory],
    }),
    AuthModule,
    UsersModule,
    LegacySystemModule,
  ],
  controllers: [PingController],
})
export class ApiModule {}
