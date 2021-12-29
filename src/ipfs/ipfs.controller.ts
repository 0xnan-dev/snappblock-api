import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResource } from '../api.roles';
import { Auth } from '../auth';
import { File } from './interfaces';
import { IpfsMessageDto } from './dto/ipfs-message.dto';
import { IpfsService } from './ipfs.service';

@ApiTags('IPFS')
@Controller('ipfs')
@Auth({
  resource: ApiResource.USER,
  action: 'create',
  possession: 'any',
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Get(':cid')
  @ApiOperation({ summary: 'Get IPFS file' })
  @ApiOkResponse({
    description: 'Returns IPFS file',
    type: IpfsMessageDto,
  })
  public async get(@Param('cid') cid: string): Promise<string> {
    return this.ipfsService.retrieve(cid);
  }

  @Post()
  @ApiOperation({ summary: 'Create IPFS message' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Returns IPFS response message',
    type: String,
  })
  @UseInterceptors(FileInterceptor('file'))
  public async post(@UploadedFile() file: File): Promise<string> {
    return this.ipfsService.store({
      content: file.buffer,
    });
  }

  @Post('pin/:cid')
  @ApiOperation({ summary: 'Pin an IPFS message' })
  @ApiCreatedResponse({
    description: 'Returns CID',
    type: String,
  })
  public async pin(@Param('cid') cid: string): Promise<string> {
    return this.ipfsService.pin(cid);
  }
}
