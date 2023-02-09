import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  SignInUserDto,
  SignUpUserDto,
  UpdateUserDto,
} from 'src/core/dtos/user.dtos';
import Helper from 'src/helpers';
import UserUseCases from '../use-cases/user/user.use-cases';

@Controller('users')
export default class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  getAllUsers() {
    return this.userUseCases.getAllUsers();
  }

  @Post('/signup')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    const user = await this.userUseCases.signUpUser(signUpUserDto);
    return Helper.formatResponse('User signed up', { user });
  }

  @Post('/signin')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    const { user, accessToken } = await this.userUseCases.signInUser(
      signInUserDto,
    );
    return Helper.formatResponse('User signed in', { user, accessToken });
  }

  @Put('/')
  @UseGuards(AuthGuard('jwt'))
  async updateUserProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const { user_uuid: userId } = req.user;
    const user = await this.userUseCases.updateUser(updateUserDto, userId);
    return Helper.formatResponse('User updated', { user });
  }
}
