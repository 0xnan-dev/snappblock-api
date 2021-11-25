import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class StringFilter {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  public equals?: string;

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsOptional()
  @Type(() => String)
  public in?: string[];

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsOptional()
  @Type(() => String)
  public notIn?: string[];

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  public lt?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  public lte?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  public gt?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  public gte?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  public contains?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  public startsWith?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  public endsWith?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  public not?: string;
}
