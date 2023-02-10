import * as dotenv from 'dotenv';

dotenv.config();

export const jwt_secret = process.env.JWT_SECRET;
export const jwt_options = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '3600s' },
};
export const typeorm = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'ourpass_tdoc',
  synchronize: false,
  autoLoadEntities: true,
};

export default {
  jwt_secret,
  typeorm,
  ssl: true,
  jwt_options,
  port: process.env.PORT || 5000,
};
