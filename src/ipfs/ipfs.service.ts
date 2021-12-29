import { Inject, Injectable, Logger } from '@nestjs/common';
import { StatResult } from 'ipfs-core-types/src/files';
import { ToFile } from 'ipfs-core-types/src/utils';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { IPFS_CLIENT } from './ipfs.factory';

@Injectable()
export class IpfsService {
  constructor(@Inject(IPFS_CLIENT) private readonly ipfs: IPFSHTTPClient) {}

  /**
   * Fetch a file from IPFS that is addressed by a valid IPFS Path.
   * https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#get
   * @param ipfsPath IPFS Path
   */
  public async retrieve(ipfsPath: string): Promise<string> {
    Logger.debug('getting file from IPFS', ipfsPath);

    const decoder = new TextDecoder();
    let content = '';

    for await (const chunk of this.ipfs.cat(ipfsPath)) {
      content += decoder.decode(chunk);
    }

    return content;
  }

  /**
   * Add files and data to IPFS.
   * https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add
   * @param data data message to be added to IPFS
   */
  public async store(file: ToFile): Promise<string> {
    const result = await this.ipfs.add(file);

    if (result) {
      Logger.debug('file shared via IPFS, path: ', result.path);

      return result.path;
    } else {
      throw new Error('error saving to IPFS');
    }
  }

  public async pin(cid: string): Promise<string> {
    const result = await this.ipfs.pin.add(cid);

    if (result) {
      Logger.debug('file pinned via IPFS, path: ', result);

      return result.toString();
    } else {
      throw new Error('error pinning to IPFS');
    }
  }

  public async fileStat(ipfsPath: string): Promise<StatResult> {
    Logger.debug('getting file stat from IPFS', ipfsPath);

    const stat = await this.ipfs.files.stat(ipfsPath);

    return stat;
  }

  /**
   * NO USE
   * @param ipfsPath
   * @returns ipfs file size
   */
  public async size(ipfsPath: string): Promise<number> {
    Logger.debug('getting file size from IPFS', ipfsPath);

    const objInfo = await this.fileStat(ipfsPath);

    return objInfo.cumulativeSize;
  }

  /**
   * NO USE
   * @returns ipfs remaining storage
   * @throws timeout
   */
  public async free(): Promise<bigint> {
    const repoStat = await this.ipfs.repo.stat();

    return repoStat.storageMax - repoStat.repoSize;
  }
}
