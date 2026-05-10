import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogQueries } from './blogs.queries';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService, BlogQueries],
})
export class BlogsModule {}
