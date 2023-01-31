import { User } from '../entity/user.entity';
import { UserModule } from '../modules/user.modules';
import { AppDataSource } from '../libs/common/data-source';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { Car } from '../entity/car.entity';

export const dbConnUser:Repository<User> = AppDataSource.getRepository(User);
export const dbConnCar:Repository<Car> = AppDataSource.getRepository(Car)
export const dbManager:EntityManager = AppDataSource.manager;

//Create user
export async function createUser(data:UserModule){
    try{
        const user: UserModule = new User()
        user.firstName = data.firstName,
        user.lastName = data.lastName,
        user.contactNo = data.contactNo,
        user.age = data.age
        const result:UserModule = await dbManager.save(user)   
        const responseData:object = {'Message' : 'New user saved sucessfully.',
                                Response:result} 
        console.log(responseData)                        
        return responseData;
        }
    catch(error){
        console.log("in createUser",error)
        return error
    }
    }

//Find user
export async function findUser(userId:string){
    try {
        const result:User[] = await dbConnUser.findBy({
            id: userId,
        })
        
        if(result.length === 0 ){
            const resMessage:object = {'Message' : 'User id not found '}
            console.log(resMessage)
            return resMessage
        }
        else{
            const responseData:object = {'Message' : 'User found in database',
                     Response:result}
            console.log(responseData)
            return responseData
        }
        } 
        catch(error){
            console.log("in findUser",error)
            return error
        }
}   

//delete user
export async function deleteUser(userId:string) {
    try{
        const results:DeleteResult = await dbConnUser.delete({
                id: userId,
            })
            if(results.affected === 0){
                const responseData = {'Message' : 'User does not exist'}
                console.log(responseData)
                return responseData
            }
            else{
                const responseData = {'Message' : 'User deleted sucessfully having id ' + userId}
                console.log(responseData)
                return responseData
            }
    }catch(error){
            console.log("in deleteUser",error)
            return error
        }
}

//Update user
export async function updateUser(userId:string,updateDetails:object) {
    try{
        const oldUser:User = await dbConnUser.findOneBy({
            id: userId,
        })
        if(oldUser === null){
            const responseData:object = {'Message' : 'User not found'}
            console.log(responseData)
            return responseData
        }
        else{
            const updateUser:User = Object.assign(oldUser, updateDetails);
            await dbConnUser.save(updateUser);
            const responseData:object = {'Message' : 'User found and updated',
                            Response: updateUser}
            console.log(responseData)                
            return responseData
        }
    }
    catch(error){
        console.log("in updateUser",error)
        return error
    }
}

//showCar
export async function showCar() {
    try{
        const results= await dbConnCar.find()
        const responseData = {'Message' : 'All Car',
                                Response:results}
        console.log(responseData)
        return responseData
            }
    catch(error){
            console.log("in showCar in user.services.ts",error)
            return error
        }
}

//book a car
export async function bookCar(userId:string,carId:string) {
    try{
        const carObject:Car = await dbConnCar.findOneBy({
            id: carId,
        })        
        const userObject:User = await dbConnUser.findOneBy({
            id: userId,
        })
        console.log('carid',userObject)
        if(carObject === null ||userObject === null){
            const responseData = {'Message' : `userId or carId not found`}
            console.log(responseData)
            return responseData
        }
        else{
            if( userObject.carDetails === undefined){
                const upduser = Object.assign(userObject,{carId:carId});
                const updcar = Object.assign(carObject,{userId:userId},{bookingStatus:true}); 
                const updUserDb = await dbConnUser.save(upduser)
                const updCarDb = await dbConnCar.save(updcar)
                const responseData = {'Message' : `carId ${carId} booked sucessfully`,
                                Response:updCarDb,updUserDb}              
                return responseData
            }
            else{
                const result = {userDetails :userObject,carDetails: carObject}
                const responseData = {'Message' : 'user has already booked a car',
                                Response:result}
                return responseData
            }
        
    }}
    catch(error){
        console.log("in bookCar in user.services.ts",error)
        return error
    }
}

//return a car
export async function returnCar(carId:string,userId:string,kmDriven:string) {
    try{
        const carObject:Car = await dbConnCar.findOneBy({id:carId})
        const userObject:User = await dbConnUser.findOneBy({id: userId})
        const upduser:User = Object.assign(userObject,{carDetails : null});
        const updcar:Car = Object.assign(carObject,{userDetails :null},{bookingStatus:false}); 
        const fare:number = parseInt(kmDriven) * carObject.ratePerKm;
        await dbConnUser.save(upduser)
        await dbConnCar.save(updcar)
        const responseData = {'Message' : `carId ${carId} returned sucessfully`,
                        'totalFare' : `${fare}`,
                        'kmDriven' : `${kmDriven}`,
                        Response:updcar,upduser}
        console.log(responseData)                
        return responseData
}
    catch(error){
        console.log("in returnCar in user.services.ts",error)
        return error
    }
}







