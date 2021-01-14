process.env.NODE_ENV = process.env.NODE_ENV || 'local';

if (process.env.NODE_ENV == 'local') {
  require('dotenv').config({
    path: '.env-local.env',
  });
} else {
  require('dotenv').config();
}

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: (process.env.NODE_ENV || 'local') !== 'production',
  migrationsRun: false,
  entities: [process.env.ENTITIES_PATH],
  migrations: ['dist/database/migrations/**/*.js'],
  subscribers: ['dist/database/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'database/migrations',
    subscribersDir: 'database/subscriber',
  },
};
