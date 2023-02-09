import { Module } from '@nestjs/common';
import DataServiceModule from 'src/services/data-services/data-service.module';
import UserUseCases from './user.use-cases';
import * as config from 'config';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [DataServiceModule, JwtModule.register(config.get('jwt_options'))],
  providers: [UserUseCases, JwtStrategy],
  exports: [UserUseCases],
})
export default class UserUseCasesModule {}
