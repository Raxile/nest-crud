import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogQueries {
  constructor(private readonly prismaService: PrismaService) {}

  createBlog(data: CreateBlogDto) {
    return this.prismaService.blog.create({ data });
  }
  findAllBlog() {
    return this.prismaService.blog.findMany();
  }
  findBlogById(id: number) {
    return this.prismaService.blog.findUnique({ where: { id } });
  }
  updateBlogById(id: number, dto: UpdateBlogDto) {
    return this.prismaService.blog.update({
      where: { id }, // which blog to update
      data: dto, // the fields to update
    });
  }
  deleteBlogById(id: number) {
    return this.prismaService.blog.delete({ where: { id } });
  }
}
