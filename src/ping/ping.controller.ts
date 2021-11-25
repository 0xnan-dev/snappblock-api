import { Controller, Get } from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Get()
  public ping(): { ping: string } {
    return { ping: 'pong' };
  }
}
