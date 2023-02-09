import { Module } from '@nestjs/common';
import DataServiceModule from 'src/services/data-services/data-service.module';
import UserUseCases from './user.use-cases';

@Module({
  imports: [DataServiceModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export default class UserUseCasesModule {}
