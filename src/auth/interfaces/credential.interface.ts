import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class Credentials {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  public password!: string;
}
