import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core';
import DataService from './data.service';
import IDataService from '../../core/abstracts/data-service';
import { Post } from '../../core/entities/post.entity';
import { Category } from '../../core/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Category])],
  providers: [{ provide: IDataService, useClass: DataService }],
  exports: [IDataService],
})
export default class DataServiceModule {}
