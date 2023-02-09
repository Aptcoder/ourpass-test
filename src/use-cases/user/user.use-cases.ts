import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/core';
import IDataService from 'src/core/abstracts/data-service';
import { SignInUserDto, SignUpUserDto } from 'src/core/dtos/user.dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class UserUseCases {
  constructor(
    private readonly dataservice: IDataService,
    private readonly jwtService: JwtService,
  ) {}

  getAllUsers() {
    return this.dataservice.users.find({});
  }

  async signUpUser(signUpUserDto: SignUpUserDto) {
    const existingUser = await this.dataservice.users.findOne({
      where: {
        email: signUpUserDto.email,
      },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(signUpUserDto.password, 10);

    let user = this.dataservice.users.create({
      ...signUpUserDto,
      password: hashedPassword,
    });

    user = await user.save();
    return user;
  }

  async signInUser(signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto;
    const existingUser = await this.dataservice.users.findOne({
      where: {
        email,
      },
    });
    if (!existingUser) {
      throw new UnauthorizedException('Invalid email address or password');
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Invalid email address or password');

    const payload = { user_uuid: existingUser.id };

    const accessToken = this.jwtService.sign(payload);
    return { user: existingUser, accessToken };
  }
}
