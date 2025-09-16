import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/core/db/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<RegisterDto>
    ){}

    async createOne(registerDto:RegisterDto & {hashedPassword:string}){
        const newUser = this.userRepository.create({
            ...registerDto,
            password:registerDto.hashedPassword
        })
        return await this.userRepository.save(newUser)
    }
    async findOneByEmail(email:string){
        return this.userRepository.findOne({
            where:{email}
        })
    }
}
