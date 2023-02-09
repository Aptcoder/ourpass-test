import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/core';
import IDataService from 'src/core/abstracts/data-service';
import { SignUpUserDto } from 'src/core/dtos/user.dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UserUseCases {
  constructor(private readonly dataservice: IDataService) {}

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
}
