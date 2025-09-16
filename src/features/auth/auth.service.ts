import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtservice: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const user = await this.userService.findOneByEmail(registerDto.email)
        if (user) throw new BadRequestException("Already this email have another user,can you user another email")

        const hashedPassword = await bcrypt.hash(registerDto.password, 10)

        const createUser = await this.userService.createOne({
            ...registerDto,
            hashedPassword
        })
        if (!createUser) throw new BadRequestException("new user is not created")
        return {
            statusCode: 201,
            message: "user is created successfully"
        }
    }
    async login(loginDto: LoginDto) {
        const userFind = await this.userService.findOneByEmail(loginDto.email)
        if (!userFind) {
            throw new BadRequestException("Your email is wrong")
        }

        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            userFind.password
        )
        if (!isPasswordValid) throw new BadRequestException("Your password is invalid")

        const payload = { email: userFind.email, role: userFind.role }
        const token = this.jwtservice.sign(payload)

        return {
            statusCode: 201,
            access_token: token
        }
    }
}
