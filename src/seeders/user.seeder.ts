import { Injectable } from '@nestjs/common';
import { User } from '../core/entities';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(User).generate(10);
    // Insert into the database.
    return this.users.insert(users);
  }

  async drop(): Promise<any> {
    return this.users.delete({});
  }
}
