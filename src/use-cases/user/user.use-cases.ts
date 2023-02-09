import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import IDataService from '../../core/abstracts/data-service';
import {
  SignInUserDto,
  SignUpUserDto,
  UpdateUserDto,
} from '../../core/dtos/user.dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import os from 'os';

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

    const accessToken = this.jwtService.sign(payload, {
      issuer: os.hostname(),
    });
    return { user: existingUser, accessToken };
  }

  async updateUser(updateUserDto: UpdateUserDto, userId: string) {
    const existingUser = await this.dataservice.users.findOne({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const user = await this.dataservice.users.save(
      {
        id: userId,
        ...updateUserDto,
      },
      {
        reload: true,
      },
    );
    return user;
  }
}
