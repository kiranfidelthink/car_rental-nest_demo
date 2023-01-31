import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Car } from "./car.entity"

@Entity()
export class Owner{
    
    @PrimaryGeneratedColumn()
    id: string

    @Column({default:'owner'})
    firmName:string

    @Column({length:20,default:'owner'})
    firstName: string

    @Column({default:'owner'})
    lastName: string

    @Column("double",{default:0})
    contactNo:number

    @Column({default:18})
    age: number

    @OneToMany(() => Car, carDetails => carDetails.ownerDetails)
    carDetails: Car[] 

}

