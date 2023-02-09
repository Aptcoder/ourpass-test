import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { UsersSeeder } from './user.seeder';
import * as config from 'config';
import { Post, User } from '../core';
import { PostsSeeder } from './post.seeder';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      ...config.get('typeorm'),
    }),
    TypeOrmModule.forFeature([User, Post]),
  ],
}).run([UsersSeeder, PostsSeeder]);
