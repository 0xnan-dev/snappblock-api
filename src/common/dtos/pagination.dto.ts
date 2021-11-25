import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    minimum: 1,
    type: Number,
    default: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  public page?: number = 1;

  @ApiPropertyOptional({
    maximum: 200,
    minimum: 1,
    type: Number,
    default: 12,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  public limit?: number = 100;
}
