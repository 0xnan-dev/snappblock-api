import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenOutputDto } from './dtos';
import { LoginInputDto } from './dtos/login-input.dto';
import { Role } from './interfaces/role.enum';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginInputDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authorize and returns access tokens',
    type: TokenOutputDto,
  })
  public async login(@Body() { publicKey, signature }: LoginInputDto): Promise<TokenOutputDto> {
    const roles = [Role.USER];

    const userWithToken = await this.authService.login({
      publicKey,
      signature,
      roles,
    });

    if (!userWithToken) {
      throw new UnauthorizedException('The passed credentials are incorrect');
    }

    return userWithToken;
  }
}
