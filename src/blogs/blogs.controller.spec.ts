import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog, ResponseDto } from './types';

describe('BlogsController', () => {
  let controller: BlogsController;
  let service: Partial<Record<keyof BlogsService, jest.Mock>>;

  const mockBlog: Blog = {
    id: 1,
    title: 'Test Blog',
    content: 'Test Content',
    createdAt: new Date(),
  };

  const mockResponse: ResponseDto<any> = {
    code: 200,
    message: 'Success',
    data: mockBlog,
  };

  beforeEach(async () => {
    service = {
      create: jest.fn().mockReturnValue({ ...mockResponse, code: 201 }),
      findAll: jest.fn().mockReturnValue({ code: 200, message: 'Success', data: [mockBlog] }),
      findOne: jest.fn().mockReturnValue(mockResponse),
      update: jest.fn().mockReturnValue(mockResponse),
      remove: jest.fn().mockReturnValue(mockResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        {
          provide: BlogsService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return created blog', () => {
      const dto: CreateBlogDto = { title: 'Test Blog', content: 'Test Content' };
      const result = controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result.code).toBe(201);
      expect(result.data).toEqual(mockBlog);
    });
  });

  describe('findAll', () => {
    it('should return all blogs', () => {
      const result = controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result.data).toEqual([mockBlog]);
    });
  });

  describe('findOne', () => {
    it('should return a single blog', () => {
      const result = controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result.data).toEqual(mockBlog);
    });
  });

  describe('update', () => {
    it('should update a blog', () => {
      const dto: UpdateBlogDto = { title: 'Updated Title' };
      const result = controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result.data).toEqual(mockBlog);
    });
  });

  describe('remove', () => {
    it('should remove a blog', () => {
      const result = controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result.data).toEqual(mockBlog);
    });
  });
});
