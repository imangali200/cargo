import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/db/user.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UserModule,
    JwtModule.register({
      secret:"secter_key",
      signOptions:{expiresIn:'7d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,],
})
export class AuthModule {}
