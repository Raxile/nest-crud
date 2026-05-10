import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog, ResponseDto } from './types';
import { buildResponse } from '../../utils';
import { BlogQueries } from './blogs.queries';

@Injectable()
export class BlogsService {
  constructor(private readonly blogQueries: BlogQueries) {}

  // Create blog
  async create(createBlogDto: CreateBlogDto): Promise<ResponseDto<Blog | null>> {
    try {
      const blog: Blog = await this.blogQueries.createBlog(createBlogDto);

      return buildResponse({
        code: 201,
        message: 'Blog created successfully',
        data: blog,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      return buildResponse({
        code: 500,
        message: 'Failed to create blog',
        data: null,
        error: errorMessage,
      });
    }
  }

  // Find all blogs
  async findAll(): Promise<ResponseDto<Blog[] | null>> {
    try {
      const blogs = await this.blogQueries.findAllBlog();
      return buildResponse({
        code: 200,
        message: 'All blogs fetched successfully',
        data: blogs,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      return buildResponse({
        code: 500,
        message: 'Failed to fetch blogs',
        data: null,
        error: errorMessage,
      });
    }
  }

  // Find one blog by ID
  async findOne(id: number): Promise<ResponseDto<Blog | null>> {
    try {
      const blog = await this.blogQueries.findBlogById(id);

      if (!blog) {
        return buildResponse({
          code: 404,
          message: 'Blog not found',
          data: null,
        });
      }

      return buildResponse({
        code: 200,
        message: 'Blog fetched successfully',
        data: blog,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      return buildResponse({
        code: 500,
        message: 'Failed to fetch blog',
        data: null,
        error: errorMessage,
      });
    }
  }

  // Update blog by ID
  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<ResponseDto<Blog | null>> {
    try {
      const updatedBlog = await this.blogQueries.updateBlogById(id, updateBlogDto);

      if (!updatedBlog) {
        return buildResponse({
          code: 404,
          message: 'Blog not found',
          data: null,
        });
      }

      return buildResponse({
        code: 200,
        message: 'Blog updated successfully',
        data: updatedBlog,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      return buildResponse({
        code: 404,
        message: 'Blog not found',
        data: null,
        error: errorMessage,
      });
    }
  }

  // Delete blog by ID
  async remove(id: number): Promise<ResponseDto<Blog | null>> {
    try {
      const removedBlog = await this.blogQueries.deleteBlogById(id);

      if (!removedBlog) {
        return buildResponse({
          code: 404,
          message: 'Blog not found',
          data: null,
        });
      }

      return buildResponse({
        code: 200,
        message: 'Blog removed successfully',
        data: removedBlog,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      return buildResponse({
        code: 404,
        message: 'Blog not found',
        data: null,
        error: errorMessage,
      });
    }
  }
}
