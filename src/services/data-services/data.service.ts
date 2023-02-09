import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core';
import { Repository } from 'typeorm';
import IDataService from '../../core/abstracts/data-service';

@Injectable()
export default class DataService implements IDataService {
  users: Repository<User>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.users = userRepository;
  }
}
