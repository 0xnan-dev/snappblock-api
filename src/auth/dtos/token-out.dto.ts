import { ApiProperty } from '@nestjs/swagger';

export class TokenOutputDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  public accessToken: string;

  @ApiProperty({
    type: String,
  })
  public expiresIn?: string;
}
