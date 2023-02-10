import { Module } from '@nestjs/common';
import DataServiceModule from '../../services/data-services/data-service.module';
import CategoryUseCases from './category.use-cases';

@Module({
  imports: [DataServiceModule],
  providers: [CategoryUseCases],
  exports: [CategoryUseCases],
})
export default class CategoryUseCasesModule {}
