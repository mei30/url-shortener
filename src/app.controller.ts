import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  hello() {
    return {message : "hello from url shortener service"};
  }

  @Get(':shortUrl')
  @Redirect('', 302)
  async longUrl(@Param('shortUrl') shortUrl: string) {
    return {url : await this.appService.longUrl(shortUrl)};
  }

  @Post('data/shorten')
  async shorten(@Body('longUrl') longUrl: string) {
    const url = await this.appService.shorten(longUrl);

    return {url : url};
  }
}
