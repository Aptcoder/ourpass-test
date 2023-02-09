import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from 'src/core/dtos/post.dtos';
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
}
