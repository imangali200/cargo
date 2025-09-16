import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole{
    USER='user',
    ADMIN='admin'
}

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    email:string

    @Column()
    name:string

    @Column()
    lastname:string

    @Column()
    phoneNumber:string

    @Column()
    password:string

    @Column({
        type:'enum',
        enum:UserRole,
        default:UserRole.USER,
    })
    role:UserRole
}
