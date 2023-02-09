import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { getRepository, Repository } from 'typeorm';
import { User, Post } from '../../src/core';
import DataService from '../../src/services/data-services/data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DataServiceModule from './../../src/services/data-services/data-service.module';
import IDataService from './../../src/core/abstracts/data-service';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';

describe('User features (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let user: User;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User, Post])],
      providers: [
        DataServiceModule,
        { provide: IDataService, useClass: DataService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get(IDataService).users as Repository<User>;
    await userRepository.delete({});
    user = userRepository.create({
      email: 'sample@testing.com',
      password: 'hash',
      firstName: 'Samuel',
      lastName: 'Testing',
    });

    user = await user.save();
    accessToken = await new JwtService({
      ...config.get('jwt_options'),
    }).sign({ user_uuid: user.id });
  });

  it('GET /users - should return all users', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: true,
      data: {
        users: expect.any(Array),
      },
    });
  });

  it('Post /users/signup - should create a new user', async () => {
    const userData = {
      email: 'sample2@testing.com',
      password: 'hash',
      firstName: 'Samuel',
      lastName: 'Testing',
    };
    const res = await request(app.getHttpServer())
      .post('/api/v1/users/signup')
      .send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      status: true,
      data: {
        user: expect.objectContaining({
          email: userData.email,
        }),
      },
    });
  });

  afterAll(() => {
    app.close();
  });
});
