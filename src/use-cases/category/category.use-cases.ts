import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../../core/dtos/category.dtos';
import IDataService from '../../core/abstracts/data-service';

@Injectable()
export default class CategoryUseCases {
  constructor(private readonly dataservice: IDataService) {}

  async getCategories() {
    return this.dataservice.categories.find({});
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    let category = this.dataservice.posts.create({
      ...createCategoryDto,
    });
    category = await category.save();
    return category;
  }
}
