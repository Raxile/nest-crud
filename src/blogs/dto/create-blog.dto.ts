import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ example: 'My First Blog', description: 'Title of the blog' })
  title: string;

  @ApiProperty({
    example: 'This is the content of my first blog.',
    description: 'Content of the blog',
  })
  content: string;
}
