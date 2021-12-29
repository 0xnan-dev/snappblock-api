import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { IpfsController } from './ipfs.controller';
import { ipfsClientFactory } from './ipfs.factory';
import { IpfsService } from './ipfs.service';

@Module({
  imports: [AuthModule],
  controllers: [IpfsController],
  providers: [ipfsClientFactory, IpfsService],
  exports: [IpfsService],
})
export class IPFSModule {}
