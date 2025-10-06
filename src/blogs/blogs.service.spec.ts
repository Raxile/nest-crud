import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

describe('BlogsService', () => {
  let service: BlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogsService],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog and return response', () => {
      const createBlogDto: CreateBlogDto = {
        title: 'Test Blog',
        content: 'Test content',
      };
      const response = service.create(createBlogDto);

      expect(response.code).toBe(201);
      expect(response.data).toMatchObject(createBlogDto);
      expect(response.data.id).toBeDefined();
      expect(response.data.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('findAll', () => {
    it('should return all blogs', () => {
      const createBlogDto: CreateBlogDto = {
        title: 'Test Blog',
        content: 'Test content',
      };
      service.create(createBlogDto);

      const response = service.findAll();
      expect(response.code).toBe(200);
      expect(response.data.length).toBe(1);
      expect(response.data[0].title).toBe('Test Blog');
    });
  });

  describe('findOne', () => {
    it('should return a blog if found', () => {
      const blog = service.create({ title: 'Blog 1', content: 'Content 1' }).data;
      const response = service.findOne(blog.id);

      expect(response.code).toBe(200);
      expect(response.data).toEqual(blog);
    });

    it('should return 404 if blog not found', () => {
      const response = service.findOne(999);
      expect(response.code).toBe(404);
      expect(response.data).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a blog', () => {
      const blog = service.create({ title: 'Old Title', content: 'Old Content' }).data;
      const updateBlogDto: UpdateBlogDto = { title: 'New Title' };
      const response = service.update(blog.id, updateBlogDto);

      expect(response.code).toBe(200);
      expect(response.data.title).toBe('New Title');
      expect(response.data.content).toBe('Old Content'); // unchanged
    });

    it('should return 404 if blog to update not found', () => {
      const response = service.update(999, { title: 'New Title' });
      expect(response.code).toBe(404);
      expect(response.data).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a blog', () => {
      const blog = service.create({ title: 'To be removed', content: 'Content' }).data;
      const response = service.remove(blog.id);

      expect(response.code).toBe(200);
      expect(response.data).toEqual(blog);

      const findResponse = service.findOne(blog.id);
      expect(findResponse.code).toBe(404);
    });

    it('should return 404 if blog to remove not found', () => {
      const response = service.remove(999);
      expect(response.code).toBe(404);
      expect(response.data).toBeNull();
    });
  });
});
