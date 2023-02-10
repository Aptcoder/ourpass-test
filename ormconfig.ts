import * as config from 'config';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.get<string>('typeorm.host'),
  port: 5432,
  username: config.get<string>('typeorm.username'),
  password: config.get<string>('typeorm.password'),
  database: config.get<string>('typeorm.database'),
  logging: false,
  migrations: ['src/migrations/**/*.ts'],
  entities: ['src/**/*.entity.ts'],
  ssl: true,
});
