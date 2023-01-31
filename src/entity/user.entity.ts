import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, OneToOne } from "typeorm"
import { Car } from "./car.entity"

@Entity()
export class User  {
    
    @PrimaryGeneratedColumn()
    id: string

    @Column({length:20,default:'user'})
    firstName: string

    @Column({default:'user'})
    lastName: string

    @Column("double",{default:0})
    contactNo:number

    @Column({default:18})
    age: number

    @OneToOne(()=> Car)
    @JoinColumn({name:'carId'})
    carDetails: Car

}

