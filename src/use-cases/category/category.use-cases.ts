import { Injectable } from '@nestjs/common';
import IDataService from '../../core/abstracts/data-service';

@Injectable()
export default class CategoryUseCases {
  constructor(private readonly dataservice: IDataService) {}

  async getCategories() {
    return this.dataservice.categories.find({});
  }
}
