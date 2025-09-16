import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './core/db/user.entity';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService:ConfigService)=>({
        type:'postgres',
        host:configService.get('DB_HOST'),
        port:configService.get("DB_PORT"),
        username:configService.get("DB_USERNAME"),
        password:configService.get("DB_PASSWORD"),
        database:configService.get("DB_DATABASE"),
        entities:[UserEntity],
        synchronize:true
      }),
      inject:[ConfigService]
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
