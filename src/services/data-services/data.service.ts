import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core';
import { Post } from '../../core/entities/post.entity';
import { Repository } from 'typeorm';
import IDataService from '../../core/abstracts/data-service';

@Injectable()
export default class DataService implements IDataService {
  users: Repository<User>;
  posts: Repository<Post>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {
    this.users = userRepository;
    this.posts = postRepository;
  }
}
