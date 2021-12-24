import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccessControlModule } from 'nest-access-control';
import { LoggerModule } from 'nestjs-pino';
import { roles } from './api.roles';
import { AuthModule } from './auth/auth.module';
import { configFactory, configSchema } from './config/configuration';
import { IPFSModule } from './ipfs/ipfs.module';
import { PingController } from './ping/ping.controller';

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
    IPFSModule,
  ],
  controllers: [PingController],
})
export class ApiModule {}
