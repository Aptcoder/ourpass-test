import {
  Body,
  Controller,
  Get,
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
} from '../core/dtos/user.dtos';
import Helper from '../helpers';
import UserUseCases from '../use-cases/user/user.use-cases';

@Controller('api/v1/users')
export default class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getAllUsers() {
    const users = await this.userUseCases.getAllUsers();
    return Helper.formatResponse('Users', { users });
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
