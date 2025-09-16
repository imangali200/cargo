import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/core/db/user.entity';
import { ProductDto } from './dto/product.dto';
import { ProductEntity } from 'src/core/db/product.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<RegisterDto>,

        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductDto>

    ) { }

    async createOne(registerDto: RegisterDto & { hashedPassword: string }) {
        const newUser = this.userRepository.create({
            ...registerDto,
            password: registerDto.hashedPassword
        })
        return await this.userRepository.save(newUser)
    }
    async findOneByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email }
        })
    }
    async createProduct(productDto: ProductDto) {
        try {
            const newProduct = this.productRepository.create(productDto)
            return await this.productRepository.save(newProduct)
            if (!newProduct) {
                throw new BadRequestException("product not be created")
            }
            return {
                statusCode: 201,
                message: "created successfully"
            }
        }

        catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    async deleteProduct(productid:string){
        const deleteProductByid =  await this.productRepository.delete({productid})
        if(deleteProductByid.affected === 0){
            throw new BadRequestException("this product is not deleted")
        }
        return {message:'deleted successfully'}
    }
}
