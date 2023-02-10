import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CategoryUseCases from '../use-cases/category/category.use-cases';
import Helper from '../helpers';

@Controller('api/v1/categories')
export default class CategoryController {
  constructor(private readonly categoryUseCases: CategoryUseCases) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getCategories() {
    const categories = await this.categoryUseCases.getCategories();
    return Helper.formatResponse(`Categories`, { categories });
  }
}
