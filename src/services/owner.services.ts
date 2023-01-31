import { Owner } from '../entity/owner.entity';
import { OwnerModule } from '../modules/owner.modules';
import { AppDataSource } from '../libs/common/data-source';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import * as express from 'express';
import { dbConnCar } from './user.services';
import { Car } from '../entity/car.entity';
const router = express.Router();

export const dbConnOwner:Repository<Owner> = AppDataSource.getRepository(Owner);
export const dbManager:EntityManager = AppDataSource.manager;

//Create owner
export async function createOwner(data:OwnerModule){
    try{
        const owner: OwnerModule = new Owner()
        owner.firmName = data.firmName
        owner.firstName = data.firstName,
        owner.lastName = data.lastName,
        owner.contactNo = data.contactNo,
        owner.age = data.age
        const result:OwnerModule = await dbManager.save(owner)   
        const responseData:object = {'Message' : 'New owner saved sucessfully.',
                                Response:result} 
        console.log(responseData)                        
        return responseData;
        }
    catch(error){
        console.log("in createowner in owner.controller.ts ",error)
        return error
    }
    }

//Find Owner
export async function findOwner(OwnerId:string){
    try {
        const result:Owner[] = await dbConnOwner.findBy({
            id: OwnerId,
        })
        
        if(result.length === 0 ){
            const resMessage:object = {'Message' : 'Owner id not found '}
            console.log(resMessage)
            return resMessage
        }
        else{
            const responseData:object = {'Message' : 'Owner found in database',
                        Response:result}
            console.log(responseData)
            return responseData
        }
        } 
        catch(error){
            console.log("in findOwner",error)
            return error
        }
}   

//delete Owner
export async function deleteOwner(OwnerId:string) {
    try{
        const results:DeleteResult = await dbConnOwner.delete({
                id: OwnerId,
            })
            if(results.affected === 0){
                const responseData = {'Message' : 'Owner does not exist'}
                console.log(responseData)
                return responseData
            }
            else{
                const responseData = {'Message' : 'Owner deleted sucessfully having id ' + OwnerId}
                console.log(responseData)
                return responseData
            }
    }catch(error){
            console.log("in deleteOwner",error)
            return error
        }
}

//Update Owner
export async function updateOwner(OwnerId:string,updateDetails:object) {
    try{
        const oldOwner:Owner = await dbConnOwner.findOneBy({
            id: OwnerId,
        })
        if(oldOwner === null){
            const responseData:object = {'Message' : 'Owner not found'}
            console.log(responseData)
            return responseData
        }
        else{
            const updateOwner:Owner = Object.assign(oldOwner, updateDetails);
            await dbConnOwner.save(updateOwner);
            const responseData:object = {'Message' : 'Owner found and updated',
                            Response: updateOwner}
            console.log(responseData)                
            return responseData
        }
    }
    catch(error){
        console.log("in updateOwner",error)
        return error
    }
}

//own a car
export async function ownCar(ownerId:string,carId:string) {
    try{
        const carObject:Car = await dbConnCar.findOneBy({
            id: carId,
        })
        const ownerObject:Owner = await dbConnOwner.findOneBy({id:ownerId})
        if(carObject === null ){
            const responseData = {'Message' : `carId ${carId} not found`}
            console.log(responseData)                
            return responseData
        }
        else{
            if(ownerObject === null){
                const responseData = {'Message' : `ownerId ${ownerId} not found`}
                console.log(responseData)                
                return responseData
            }
            else{
                const updcar = Object.assign(carObject,{owner :ownerId}); 
                await dbConnCar.save(updcar)
                const responseData = {'Message' : `carId ${carId} added to your firm sucessfully`,
                                Response:updcar}
                console.log(responseData)                
                return responseData
                }  
        }                
}
    catch(error){
        console.log("in ownCar in owner.services.ts",error)
        return error
    }
}   

//deown a car 
export async function deownCar(carId:string) {
    try{
        const carObject:Car = await dbConnCar.findOneBy({
            id: carId,
        })
        if(carObject === null){
            const responseData = {'Message' : 'carId do not exist'}
            return responseData
        }
        else{
            console.log(carObject)
            const updcar = Object.assign(carObject,{owner :null}); 
            await dbConnCar.save(updcar)

            const responseData = {'Message' : `carId ${carId} deowned sucessfully`,
                            Response:updcar}
            console.log(responseData)                
            return responseData
        }
}
    catch(error){
        console.log("in deownCar in owner.services.ts",error)
        return error
    }
}

