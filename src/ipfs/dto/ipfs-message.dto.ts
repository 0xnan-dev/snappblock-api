import { ApiProperty } from '@nestjs/swagger';

export class IpfsMessageDto {
  @ApiProperty({ description: 'Content' })
  public content: string;
}
