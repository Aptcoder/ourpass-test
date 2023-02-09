import { Controller, Get } from '@nestjs/common';
import UserUseCases from '../use-cases/user/user.use-cases';

@Controller('users')
export default class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  getAllUsers() {
    return this.userUseCases.getAllUsers();
  }
}
