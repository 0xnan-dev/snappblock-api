import { FactoryProvider } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { create, IPFSHTTPClient } from 'ipfs-http-client';

export const IPFS_CLIENT = Symbol('IPFS_CLIENT');

export const ipfsClientFactory: FactoryProvider<IPFSHTTPClient> = {
  provide: IPFS_CLIENT,
  useFactory: (config: ConfigService): IPFSHTTPClient => {
    const host = config.get<string>('ipfs.host');
    const port = config.get<number>('ipfs.port');
    const protocol = config.get<string>('ipfs.protocol');

    return create({ host, port, protocol });
  },
  inject: [ConfigService],
};
