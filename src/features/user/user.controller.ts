import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/core/guards/jwt_auth.guard';
import { ProductDto } from './dto/product.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createProduct')
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() productDto:ProductDto){
    return await this.userService.createProduct(productDto)
  }
  @Delete(':productid')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('productid') productid:string){
    return await this.userService.deleteProduct(productid)
  }
}

