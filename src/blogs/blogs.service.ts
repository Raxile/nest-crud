import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog, ResponseDto } from './types';
import { buildResponse } from '../../utils';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [];

  create(createBlogDto: CreateBlogDto): ResponseDto<Blog> {
    const blog: Blog = {
      id: Math.floor(Math.random() * 1000),
      title: createBlogDto.title,
      content: createBlogDto.content,
      createdAt: new Date(),
    };
    this.blogs.push(blog);

    return buildResponse({
      code: 201,
      message: 'Blog created successfully (dummy)',
      data: blog,
    });
  }

  findAll(): ResponseDto<Blog[]> {
    return buildResponse({
      code: 200,
      message: 'All blogs fetched successfully (dummy)',
      data: this.blogs,
    });
  }

  findOne(id: number): ResponseDto<Blog> {
    const blog = this.blogs.find((b) => b.id === id) || null;

    return buildResponse({
      code: blog ? 200 : 404,
      message: blog ? 'Blog fetched successfully (dummy)' : 'Blog not found',
      data: blog,
    });
  }

  update(id: number, updateBlogDto: UpdateBlogDto): ResponseDto<Blog> {
    const index = this.blogs.findIndex((b) => b.id === id);
    if (index === -1) return { code: 404, message: 'Blog not found', data: null };

    const updatedBlog = { ...this.blogs[index], ...updateBlogDto };
    this.blogs[index] = updatedBlog;

    return buildResponse({
      code: 200,
      message: 'Blog updated successfully (dummy)',
      data: updatedBlog,
    });
  }
  remove(id: number): ResponseDto<Blog> {
    const index = this.blogs.findIndex((b) => b.id === id);
    if (index === -1) return { code: 404, message: 'Blog not found', data: null };

    const removedBlog = this.blogs.splice(index, 1)[0];

    return buildResponse({
      code: 200,
      message: 'Blog removed successfully (dummy)',
      data: removedBlog,
    });
  }
}
