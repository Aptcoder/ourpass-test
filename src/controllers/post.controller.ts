import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto, UpdatePostDto } from '../core/dtos/post.dtos';
import Helper from '../helpers';
import PostUseCases from '../use-cases/post/post.use-cases';

@Controller('api/v1/posts')
export default class PostController {
  constructor(private readonly postUseCases: PostUseCases) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getPosts(@Request() req) {
    const { user_uuid: userId } = req.user;
    const posts = await this.postUseCases.getUserPosts(userId);
    return Helper.formatResponse(`User's posts`, { posts });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    const { user_uuid: userId } = req.user;
    const post = await this.postUseCases.createPost(createPostDto, userId);
    return Helper.formatResponse(`Post created`, { post });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:postId')
  @HttpCode(200)
  async deletePost(@Param('postId') postId: string, @Request() req) {
    const { user_uuid: userId } = req.user;
    await this.postUseCases.deletePost(postId, userId);
    return Helper.formatResponse(`Post deleted`);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:postId')
  @HttpCode(200)
  async updatePost(
    @Body() updatePostDto: UpdatePostDto,
    @Param('postId') postId: string,
    @Request() req,
  ) {
    const { user_uuid: userId } = req.user;
    const post = await this.postUseCases.updatePost(
      updatePostDto,
      postId,
      userId,
    );
    return Helper.formatResponse(`Post updated`, { post });
  }
}
