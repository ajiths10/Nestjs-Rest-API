const ConnectionOptions = require('typeorm');
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configSerive = new ConfigService();

export default new ConnectionOptions.DataSource({
  type: configSerive.get('DATABASE_TYPE'),
  host: configSerive.get('DATABASE_LOCALHOST'),
  port: configSerive.get('DATABASE_PORT'),
  username: configSerive.get('DATABASE_USER_NAME'),
  password: configSerive.get('DATABASE_USER_PASSWORD'),
  database: configSerive.get('DATABASE_NAME'),
  entities: ['dist/src/**/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  migrationsRun: false,
  logging: false,
  // logger: 'file',

  migrations: ['dist/src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  migrationsTableName: 'typeorm_migrations',
});
