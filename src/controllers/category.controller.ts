import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CategoryUseCases from '../use-cases/category/category.use-cases';
import Helper from '../helpers';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../core/dtos/category.dtos';

@Controller('api/v1/categories')
export default class CategoryController {
  constructor(private readonly categoryUseCases: CategoryUseCases) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getCategories() {
    const categories = await this.categoryUseCases.getCategories();
    return Helper.formatResponse(`Categories`, { categories });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createPost(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryUseCases.createCategory(
      createCategoryDto,
    );
    return Helper.formatResponse(`Category created`, { category });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    await this.categoryUseCases.deleteCategory(categoryId);
    return Helper.formatResponse(`Category deleted`);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:categoryId')
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('categoryId') categoryId: string,
  ) {
    const category = await this.categoryUseCases.updateCategory(
      updateCategoryDto,
      categoryId,
    );
    return Helper.formatResponse(`Category updated`, { category });
  }
}
