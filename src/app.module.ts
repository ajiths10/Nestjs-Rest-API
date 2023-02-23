import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user/entities/user.entity';
import { TodosModule } from './todos/todos.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql'>('DATABASE_TYPE'), // hard code type mysql (temp)
        host: configService.get<string>('DATABASE_LOCALHOST'),
        port: Number(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USER_NAME'),
        password: configService.get<string>('DATABASE_USER_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        //entities: [Users],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    AdminModule,
    TodosModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
