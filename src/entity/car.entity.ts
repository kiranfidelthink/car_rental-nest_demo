import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm"
import { Owner } from "./owner.entity"
import { User } from "./user.entity"

@Entity()
export class Car {
    
    @PrimaryGeneratedColumn()
    id: string

    @Column({default:'Tata'})
    make: string

    @Column({default:"Nexon"})
    model: string

    @Column({default:4})
    ratePerKm:number

    @Column({default:4})
    noOfSeat: number

    @Column({default:5000})
    deposit:number

    @Column({default:false})
    bookingStatus:boolean

    @ManyToOne(() => Owner)
    @JoinColumn({name:'ownerId'})
    ownerDetails: Owner

    @OneToOne(() => User)
    @JoinColumn({name:'userId'})
    userDetails: User

}



