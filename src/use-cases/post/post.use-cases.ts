import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from 'src/core/dtos/post.dtos';
import IDataService from '../../core/abstracts/data-service';

@Injectable()
export default class PostUseCases {
  constructor(private readonly dataservice: IDataService) {}

  async getUserPosts(userId: string) {
    return this.dataservice.posts.find({
      where: {
        userId,
      },
    });
  }

  async createPost(createPostDto: CreatePostDto, userId: string) {
    let post = this.dataservice.posts.create({
      ...createPostDto,
      userId,
    });
    post = await post.save();
    return post;
  }

  async deletePost(postId: string, userId: string) {
    await this.dataservice.posts.delete({
      id: postId,
      userId,
    });

    return true;
  }

  async updatePost(updatePostDto: UpdatePostDto, postId, userId) {
    const existingPost = await this.dataservice.posts.findOne({
      where: {
        id: postId,
        userId,
      },
    });
    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }
    const updatedPost = this.dataservice.posts.save(
      {
        id: existingPost.id,
        ...updatePostDto,
      },
      {
        reload: true,
      },
    );

    return updatedPost;
  }
}
