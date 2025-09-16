import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    productid:string

    @Column()
    productName:string
}