import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as config from 'config';
import UserController from './controllers/user.controller';
import DataServiceModule from './services/data-services/data-service.module';
import UserUseCasesModule from './use-cases/user/user-use-cases.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.get('typeorm'),
    }),
    DataServiceModule,
    UserUseCasesModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
