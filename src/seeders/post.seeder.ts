import { Injectable } from '@nestjs/common';
import { Post, User } from '../core/entities';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class PostsSeeder implements Seeder {
  constructor(
    @InjectRepository(Post) private readonly posts: Repository<Post>,
  ) {}

  async seed(): Promise<any> {
    let user = new User();
    user.email = faker.internet.email();
    user.password = 'oass';
    user.firstName = 'sample';
    user.lastName = 'testing';

    user = await user.save();
    // Generate 10 posts.
    const posts = DataFactory.createForClass(Post).generate(10, {
      userId: user.id,
    });
    // Insert into the database.
    return this.posts.insert(posts);
  }

  async drop(): Promise<any> {
    return this.posts.delete({});
  }
}
