import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpUserDto } from 'src/core/dtos/user.dtos';
import Helper from 'src/helpers';
import UserUseCases from '../use-cases/user/user.use-cases';

@Controller('users')
export default class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  getAllUsers() {
    return this.userUseCases.getAllUsers();
  }

  @Post('/signup')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    const user = await this.userUseCases.signUpUser(signUpUserDto);
    return Helper.formatResponse('User signed up', { user });
  }
}
