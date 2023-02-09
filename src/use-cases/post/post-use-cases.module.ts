import { Module } from '@nestjs/common';
import DataServiceModule from '../../services/data-services/data-service.module';
import PostUseCases from './post.use-cases';

@Module({
  imports: [DataServiceModule],
  providers: [PostUseCases],
  exports: [PostUseCases],
})
export default class PostUseCasesModule {}
