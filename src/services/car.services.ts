import { DeleteResult, EntityManager, Repository } from "typeorm";
import { Car } from "../entity/car.entity";
import { AppDataSource } from "../libs/common/data-source";
import { CarModule } from "../modules/car.modules";

export const dbConnection:Repository<Car> = AppDataSource.getRepository(Car);
export const dbManager:EntityManager = AppDataSource.manager;

//Create car
export async function createCar(data:CarModule){
    try{
        const car: CarModule = new Car()
        car.make = data.make,
        car.model = data.model,
        car.noOfSeat = data.noOfSeat,
        car.ratePerKm = data.ratePerKm,
        car.deposit = data.deposit
        const result:CarModule = await dbManager.save(car)   
        const responseData:object = {'Message' : 'New car saved sucessfully.',
                                Response:result} 
        console.log(responseData)                        
        return responseData;
        }
    catch(error){
        console.log("in createCar in car.service.ts ",error)
        return error
    }
    }

//Find car
export async function findCar(carId:string){
    try {
        const result:Car[] = await dbConnection.findBy({
            id: carId,
        })
        
        if(result.length === 0 ){
            const resMessage:object = {'Message' : 'car id not found '}
            console.log(resMessage)
            return resMessage
        }
        else{
            const responseData:object = {'Message' : 'car found in database',
                     Response:result}
            console.log(responseData)
            return responseData
        }
        } 
        catch(error){
            console.log("in findCar in car.services.ts ",error)
            return error
        }
}   

//delete car
export async function deleteCar(carId:string) {
    try{
        const results:DeleteResult = await dbConnection.delete({
                id: carId,
            })
            if(results.affected === 0){
                const responseData = {'Message' : 'car does not exist'}
                console.log(responseData)
                return responseData
            }
            else{
                const responseData = {'Message' : 'car deleted sucessfully having id ' + carId}
                console.log(responseData)
                return responseData
            }
    }catch(error){
            console.log("in deleteCar in car.services.ts ",error)
            return error
        }
}

//Update car
export async function updateCar(carId:string,updateDetails:object) {
    try{
        const oldCar:Car = await dbConnection.findOneBy({
            id: carId,
        })
        if(oldCar === null){
            const responseData:object = {'Message' : 'car not found'}
            console.log(responseData)
            return responseData
        }
        else{
            const updateCar:Car = Object.assign(oldCar, updateDetails);
            await dbConnection.save(updateCar);
            const responseData:object = {'Message' : 'car found and updated',
                            Response: updateCar}
            console.log(responseData)                
            return responseData
        }
    }
    catch(error){
        console.log("in updateCar in car.services.ts ",error)
        return error
    }
}







