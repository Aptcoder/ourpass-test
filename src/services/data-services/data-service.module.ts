import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core';
import DataService from './data.service';
import IDataService from 'src/core/abstracts/data-service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [{ provide: IDataService, useClass: DataService }],
  exports: [IDataService],
})
export default class DataServiceModule {}
