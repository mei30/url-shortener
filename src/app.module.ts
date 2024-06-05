import * as redisStore from 'cache-manager-redis-store';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({
    isGlobal: true,
    store: redisStore,
    host: 'localhost',
    port: 6379
  }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
