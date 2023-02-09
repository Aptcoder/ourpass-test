import { Injectable } from '@nestjs/common';
import IDataService from 'src/core/abstracts/data-service';

@Injectable()
export default class UserUseCases {
  constructor(private readonly dataservice: IDataService) {}

  getAllUsers() {
    return this.dataservice.users.find({});
  }
}
