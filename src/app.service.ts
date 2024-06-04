import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  private urlMap: Map<string, string>
  private chars: string
  private counter: number

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.urlMap = new Map<string, string>()
    this.chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.counter = 1
  }

  async shorten(realUrl: string): Promise<unknown> {

    const shortUrl = await this.cacheManager.get(realUrl)

    console.log(shortUrl)

    if (shortUrl != null)
      return shortUrl

    let shortenUrl = ''

    let copy_of_counter = this.counter
    while (copy_of_counter != 0)
    {
      let reminder = copy_of_counter % this.chars.length
      shortenUrl += this.chars[reminder]
      copy_of_counter = Math.floor(copy_of_counter / this.chars.length)
    }


    await this.cacheManager.set(shortenUrl, realUrl, 0)
    await this.cacheManager.set(realUrl, shortenUrl, 0)
  
    ++this.counter

    return shortenUrl.toString();
  }

  async longUrl(shortUrl: string): Promise<unknown> {
    const longURL = await this.cacheManager.get(shortUrl)

    if (longURL == null)
      throw new NotFoundException(`There is no entry for ${shortUrl}`)

    return longURL
  }
}
