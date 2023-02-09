import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import UserUseCases from './user.use-cases';
import * as config from 'config';
import IDataService from '../../core/abstracts/data-service';
import { User } from '../../core';
import IRepository from 'src/core/abstracts/generic-repository';
import { ConflictException } from '@nestjs/common';

describe('User use cases', () => {
  let userUserCases: UserUseCases;

  class DataServiceFixture implements IDataService {
    users: IRepository<User>;

    constructor() {
      this.users = {
        findOne() {
          return Promise.resolve(new User());
        },
        find() {
          return Promise.resolve([new User()]);
        },
        create(options) {
          return {
            ...options,
            save: () => Promise.resolve({ ...options }),
          } as User;
        },
      };
    }
  }

  let dataService: DataServiceFixture;

  beforeEach(async () => {
    dataService = new DataServiceFixture();
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        DataServiceFixture,
        JwtModule.register(config.get('jwt_options')),
      ],
      providers: [
        UserUseCases,
        JwtStrategy,
        {
          provide: IDataService,
          useValue: dataService,
        },
      ],
      exports: [UserUseCases],
    }).compile();

    userUserCases = app.get<UserUseCases>(UserUseCases);
  });

  describe('user sign up', () => {
    it('should sign up user"', async () => {
      const findOneSpy = jest
        .spyOn(dataService.users, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      const createSpy = jest.spyOn(dataService.users, 'create');
      const userData = {
        email: 'samuel@testing.com',
        firstName: 'Samuel',
        lastName: 'Omilo',
        password: 'sample',
      };
      const result = await userUserCases.signUpUser(userData);

      expect(findOneSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalled();
      expect(result).toMatchObject({
        email: 'samuel@testing.com',
        firstName: 'Samuel',
        lastName: 'Omilo',
      });
    });

    it('Should throw error if user already exists', async () => {
      const userData = {
        email: 'samuel@testing.com',
        firstName: 'Samuel',
        lastName: 'Omilo',
        password: 'sample',
      };
      const findOneSpy = jest
        .spyOn(dataService.users, 'findOne')
        .mockImplementation(() => Promise.resolve(userData as User));
      const createSpy = jest.spyOn(dataService.users, 'create');
      expect(async () => {
        await userUserCases.signUpUser(userData);
      }).rejects.toBeInstanceOf(ConflictException);
    });
  });
});
