import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsString()
    lastname: string

    @IsNumber()
    phoneNumber: string

    @IsString()
    password: string
    role: any;
}