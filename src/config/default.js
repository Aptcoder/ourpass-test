module.exports = {
  jwt_secret: 'sample-jwt-secret',
  jwt_options: {
    secret: 'sample-jwt-secret',
    signOptions: { expiresIn: '3600s' },
  },

  typeorm: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'wonderful.',
    database: 'ourpass-test',
    synchronize: true,
    autoLoadEntities: true,
  },
};
