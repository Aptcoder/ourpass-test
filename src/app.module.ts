import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import * as config from 'config';
import UserController from './controllers/user.controller';
import DataServiceModule from './services/data-services/data-service.module';
import UserUseCasesModule from './use-cases/user/user-use-cases.module';
import PostUseCasesModule from './use-cases/post/post-use-cases.module';
import PostController from './controllers/post.controller';
import CategoryUseCasesModule from './use-cases/category/category-use-case.module';
import CategoryController from './controllers/category.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.get('typeorm'),
      ssl: config.get('ssl'),
    }),
    DataServiceModule,
    UserUseCasesModule,
    PostUseCasesModule,
    CategoryUseCasesModule,
  ],
  controllers: [
    AppController,
    UserController,
    PostController,
    CategoryController,
  ],
})
export class AppModule {}
