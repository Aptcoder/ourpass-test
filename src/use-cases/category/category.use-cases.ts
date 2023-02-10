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
    let category = this.dataservice.categories.create({
      ...createCategoryDto,
    });
    category = await category.save();
    return category;
  }

  async deleteCategory(categoryId: string) {
    await this.dataservice.categories.delete({
      id: categoryId,
    });

    return true;
  }
}
