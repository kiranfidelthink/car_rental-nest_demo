import * as express from 'express';
import {  deleteUser, findUser, createUser, updateUser, showCar, bookCar, returnCar } from '../services/user.services';
import { UserModule } from '../modules/user.modules';
const router = express.Router();

//Create user
router.post('/api/user',async (req:express.Request, res:express.Response) => {
    try{
        const data :UserModule = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            contactNo: req.body.contactNo
            }                
        res.send(await createUser(data))
    }
    catch(error){
        console.log('in createUser in user.controller.ts ',error)
        return error
    }
});

//Find user
router.get('/api/findUser/:userId', async function (req:express.Request, res:express.Response) {
    try{
        const userId:string = req.params.userId
        res.send(await findUser(userId))
    }
    catch(error){
        console.log('in findUser in user.controller.ts ',error)
        return error
    }
});

//Delete user
router.delete('/api/user/delete/:userId', async (req:express.Request, res:express.Response) => {
    try{
        const userId:string = req.params.userId;
        res.send(await deleteUser(userId))
    }
    catch(error){
        console.log('in deleteUser in user.controller.ts ',error)
    }
});

//Update user
router.put("/api/user/update/:userId", async function (req:express.Request, res:express.Response) {
    try{
        const updateDetails:object = req.body
        const userId:string = req.params.userId
        res.send(await updateUser(userId,updateDetails))
    }
    catch(error){
        console.log('in updateUser in user.controller.ts ',error)
        return error
    }
})

//Show cars
router.get("/api/user/showCar", async function (req:express.Request, res:express.Response) {
    try{
        res.send(await showCar())
    }
    catch(error){
        console.log('in showCar in user.controller.ts ',error)
        return error
    }
})

//Book a car
router.put("/api/user/bookCar/:userId/:carId", async function (req:express.Request, res:express.Response) {
    try{
        const userId:string= req.params.userId
        const carId:string= req.params.carId
        res.send(await bookCar(userId,carId))
    }
    catch(error){
        console.log('in bookCar in user.controller.ts ',error)
        return error
    }
})

//return a car
router.put("/api/user/returnCar/:userId/:carId/:kmDriven", async function (req:express.Request, res:express.Response) {
    try{
        const userId:string= req.params.userId
        const carId:string= req.params.carId
        const kmDriven:string= req.params.kmDriven
        res.send(await returnCar(carId,userId,kmDriven))
    }
    catch(error){
        console.log('in bookCar in user.controller.ts ',error)
        return error
    }
})

export {router as userRouter }




