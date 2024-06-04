import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':shortUrl')
  @Redirect('', 302)
  longUrl(@Param('shortUrl') shortUrl: string) {
    return {url : this.appService.longUrl(shortUrl)};
  }

  @Post('data/shorten')
  shorten(@Body('longUrl') longUrl: string) {
    const url = this.appService.shorten(longUrl);

    return {url : url};
  }
}
