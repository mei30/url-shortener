import { Injectable, NotFoundException } from '@nestjs/common';

import  * as crc32  from 'crc-32'
import { randomInt } from 'crypto';

@Injectable()
export class AppService {
  private urlMap: Map<string, string>
  private chars: string
  private counter: number

  constructor() {
    this.urlMap = new Map<string, string>()
    this.chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.counter = 1
  }

  shorten(realUrl: string): string {
    if (this.urlMap.has(realUrl))
      return this.urlMap.get(realUrl)

    
    // choose a algorithm for shortening url
    let shortenUrl = ''

    ++this.counter

    let copy_of_counter = this.counter
    while (copy_of_counter != 0)
    {
      let reminder = copy_of_counter % this.chars.length
      shortenUrl += this.chars[reminder]
      copy_of_counter = Math.floor(copy_of_counter / this.chars.length)
    }


    this.urlMap.set(shortenUrl, realUrl)
    this.urlMap.set(realUrl, shortenUrl)

    return shortenUrl.toString();
  }

  longUrl(shortUrl: string): string {
    if (!this.urlMap.has(shortUrl))
      throw new NotFoundException(`The requested ${shortUrl} does not exist.`, )
    
    return this.urlMap.get(shortUrl)
  }
}
