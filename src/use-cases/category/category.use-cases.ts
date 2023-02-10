import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../core/dtos/category.dtos';
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

  async updateCategory(updateCategoryDto: UpdateCategoryDto, categoryId) {
    const existingCategory = await this.dataservice.categories.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }
    const updatedcategory = this.dataservice.categories.save(
      {
        id: existingCategory.id,
        ...updateCategoryDto,
      },
      {
        reload: true,
      },
    );

    return updatedcategory;
  }
}
