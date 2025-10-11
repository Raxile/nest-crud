import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogQueries } from './blogs.queries';
import { Blog } from './types';

describe('BlogsService', () => {
  let service: BlogsService;

  // Mock implementation of BlogQueries
  const mockBlogQueries = {
    createBlog: jest.fn(),
    findAllBlog: jest.fn(),
    findBlogById: jest.fn(),
    updateBlogById: jest.fn(),
    deleteBlogById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogsService, { provide: BlogQueries, useValue: mockBlogQueries }],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog and return response', async () => {
      const createBlogDto: CreateBlogDto = { title: 'Test Blog', content: 'Test content' };
      const mockBlog: Blog = { id: 1, ...createBlogDto, createdAt: new Date() };

      mockBlogQueries.createBlog.mockResolvedValue(mockBlog);

      const response = await service.create(createBlogDto);

      expect(response.code).toBe(201);
      expect(response.data).toMatchObject(createBlogDto);
      expect(response.data.id).toBeDefined();
      expect(response.data.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('findAll', () => {
    it('should return all blogs', async () => {
      const mockBlogs: Blog[] = [
        { id: 1, title: 'Test Blog', content: 'Test content', createdAt: new Date() },
      ];
      mockBlogQueries.findAllBlog.mockResolvedValue(mockBlogs);

      const response = await service.findAll();

      expect(response.code).toBe(200);
      expect(response.data.length).toBe(1);
      expect(response.data[0].title).toBe('Test Blog');
    });
  });

  describe('findOne', () => {
    it('should return a blog if found', async () => {
      const mockBlog: Blog = {
        id: 1,
        title: 'Blog 1',
        content: 'Content 1',
        createdAt: new Date(),
      };
      mockBlogQueries.findBlogById.mockResolvedValue(mockBlog);

      const response = await service.findOne(1);

      expect(response.code).toBe(200);
      expect(response.data).toEqual(mockBlog);
    });

    it('should return 404 if blog not found', async () => {
      mockBlogQueries.findBlogById.mockResolvedValue(null);

      const response = await service.findOne(999);
      expect(response.code).toBe(404);
      expect(response.data).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a blog', async () => {
      const mockBlog: Blog = {
        id: 1,
        title: 'Old Title',
        content: 'Old Content',
        createdAt: new Date(),
      };
      const updatedBlog: Blog = { ...mockBlog, title: 'New Title' };
      mockBlogQueries.updateBlogById.mockResolvedValue(updatedBlog);

      const response = await service.update(1, { title: 'New Title' });

      expect(response.code).toBe(200);
      expect(response.data.title).toBe('New Title');
      expect(response.data.content).toBe('Old Content');
    });

    it('should return 404 if blog to update not found', async () => {
      mockBlogQueries.updateBlogById.mockResolvedValue(null);

      const response = await service.update(999, { title: 'New Title' });
      expect(response.code).toBe(404);
      expect(response.data).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a blog', async () => {
      const mockBlog: Blog = {
        id: 1,
        title: 'To be removed',
        content: 'Content',
        createdAt: new Date(),
      };
      mockBlogQueries.deleteBlogById.mockResolvedValue(mockBlog);
      mockBlogQueries.findBlogById.mockResolvedValue(null);

      const response = await service.remove(1);

      expect(response.code).toBe(200);
      expect(response.data).toEqual(mockBlog);

      const findResponse = await service.findOne(1);
      expect(findResponse.code).toBe(404);
    });

    it('should return 404 if blog to remove not found', async () => {
      mockBlogQueries.deleteBlogById.mockResolvedValue(null);

      const response = await service.remove(999);
      expect(response.code).toBe(404);
      expect(response.data).toBeNull();
    });
  });
});
