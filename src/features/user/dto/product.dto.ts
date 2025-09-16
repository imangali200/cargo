import { IsNotEmpty, IsString } from "class-validator";

export class ProductDto{
    @IsNotEmpty()
    @IsString()
    productid:string

    @IsNotEmpty()
    @IsString()
    productName:string
}