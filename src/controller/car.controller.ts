import * as express from 'express';
import {  deleteCar, findCar, createCar, updateCar } from '../services/car.services';
import { CarModule } from '../modules/car.modules';

const router = express.Router();

//Create car
router.post('/api/car',async (req:express.Request, res:express.Response) => {
    try{
        const data :CarModule = {
            make: req.body.make,
            model: req.body.model,
            noOfSeat: req.body.noOfSeat,
            deposit: req.body.deposit,
            ratePerKm:req.body.ratePerKm,
            bookingStatus:req.body.bookingStatus
            }                
        res.send(await createCar(data))
    }
    catch(error){
        console.log('in createCar in car.controller.ts ',error)
        return error
    }
});

//Find car
router.get('/api/car/:carId', async function (req:express.Request, res:express.Response) {
    try{
        const carId:string = req.params.carId   
        res.send(await findCar(carId))
    }
    catch(error){
        console.log('in findCar in car.controller.ts ',error)
        return error
    }
});

//Delete car
router.delete('/api/car/delete/:carId', async (req:express.Request, res:express.Response) => {
    try{
        const carId:string = req.params.carId;
        res.send(await deleteCar(carId))
    }
    catch(error){
        console.log('in deleteCar in car.controller.ts ',error)
    }
});

//Update car
router.put("/api/car/update/:carId", async function (req:express.Request, res:express.Response) {
    try{
        const updateDetails:object = req.body;
        const carId:string = req.params.carId;
        res.send(await updateCar(carId,updateDetails))
    }
    catch(error){
        console.log('in updateCar in car.controller.ts ',error)
        return error
    }
})



export {router as carRouter }




