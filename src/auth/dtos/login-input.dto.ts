import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsString } from 'class-validator';

export class LoginInputDto {
  @IsNotEmpty()
  @IsBase64()
  @ApiProperty({
    example: 'cosmos1wg0d44cx0g9nmhze78fd8z5x3nkpmel3349j3k',
    type: String,
  })
  public readonly publicKey: string;

  @IsNotEmpty()
  @IsBase64()
  @ApiProperty({
    example: 'signed$$message',
    type: String,
  })
  @IsString()
  public readonly signature: string;
}
