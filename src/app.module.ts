import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import * as config from 'config';
import UserController from './controllers/user.controller';
import DataServiceModule from './services/data-services/data-service.module';
import UserUseCasesModule from './use-cases/user/user-use-cases.module';
import PostUseCasesModule from './use-cases/post/post-use-cases.module';
import PostController from './controllers/post.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.get('typeorm'),
      ssl: true,
    }),
    DataServiceModule,
    UserUseCasesModule,
    PostUseCasesModule,
  ],
  controllers: [AppController, UserController, PostController],
})
export class AppModule {}
