import * as express from 'express';
import { createQueryBuilder } from 'typeorm';
import { Car } from '../entity/car.entity';
import { AppDataSource } from '../libs/common/data-source';
import { OwnerModule } from '../modules/owner.modules';
import { createOwner, deleteOwner, deownCar, findOwner, ownCar, updateOwner } from '../services/owner.services';
import { dbConnCar } from '../services/user.services';

const router = express.Router();

//Create owner
router.post('/api/owner',async (req:express.Request, res:express.Response) => {
    try{
        const data :OwnerModule = {
            firmName:req.body.firmName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            contactNo: req.body.contactNo
            }                
        res.send(await createOwner(data))
    }
    catch(error){
        console.log('in createOwner in owner.controller.ts ',error)
        return error
    }
});

//Find owner
router.get('/api/owner/:ownerId', async function (req:express.Request, res:express.Response) {
    try{
        const ownerId:string = req.params.ownerId   
        res.send(await findOwner(ownerId))
    }
    catch(error){
        console.log('in findowner in owner.controller.ts ',error)
        return error
    }
});

//Delete owner
router.delete('/api/owner/delete/:ownerId', async (req:express.Request, res:express.Response) => {
    try{
        const ownerId:string = req.params.ownerId;
        res.send(await deleteOwner(ownerId))
    }
    catch(error){
        console.log('in deleteowner in owner.controller.ts ',error)
    }
});

//Update owner
router.put("/api/owner/update/:ownerId", async function (req:express.Request, res:express.Response) {
    try{
        const updateDetails:object = req.body
        const ownerId:string = req.params.ownerId
        res.send(await updateOwner(ownerId,updateDetails))
    }
    catch(error){
        console.log('in updateowner in owner.controller.ts ',error)
        return error
    }
})

//Own a car
router.put("/api/owner/ownCar/:ownerId/:carId", async function (req:express.Request, res:express.Response) {
    try{
        const ownerId:string= req.params.ownerId
        const carId:string= req.params.carId
        res.send(await ownCar(ownerId,carId))
    }
    catch(error){
        console.log('in ownCar in owner.controller.ts ',error)
        return error
    }
})

//deown a car
router.put("/api/owner/deownCar/:carId",async function (req:express.Request,res:express.Response){
    try {
        const carId:string= req.params.carId
        res.send(await deownCar(carId));
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//show all car in the firm
router.get("/api/owner/showAllCars/:ownerId",async function (req:express.Request,res:express.Response){
    try{
        const ownerId:string= req.params.ownerId;
        const dat = await dbConnCar.createQueryBuilder("car")
        .innerJoinAndSelect("carDetails.user", "user")
        .getMany()
        console.log(dat)
        // const allCars:Car[] = await dbConnCar.find({where:{id:ownerId}})
        // Select a user and all their watchers
        // const query = AppDataSource.getRepository(Car).createQueryBuilder('owner')
        // .innerJoinAndSelect('car.ownerDetails','c'); // 'w.userId = u.id' may be omitted
        // const result = await query.getMany();
    // const query = dbConnCar.createQueryBuilder()
    // .innerJoinAndSelect('c.owner', 'o'); // 'w.userId = u.id' may be omitted
    // const result = await query.getMany();
    // console.log('query',result)
        // const carobj:Car[] = await dbConnCar.find({
        //     where: {id:ownerId},
        //     relations: ["ownerDetails","userDetails"]})
            
        // console.log(carobj)
        // res.send(allCars)
        // console.log(allCars)
        // await dbConnCar.find({where:{}});    
    }catch(error){
        console.log('in showAllCars in owner.controller.ts',error)
        return error
    }
})


export {router as ownerRouter};

function parsestring(arg: number): string | import("typeorm").FindOperator<string> {
    throw new Error('Function not implemented.');
}
