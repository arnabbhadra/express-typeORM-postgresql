import { BaseEntity } from "typeorm";
import { App } from "../../config/App";
import { AppDataSource } from "../../config/appDataSource"
export class DBService{
    // Create database connection
    public connect = ()=>{
        return  new Promise((resolve, reject)=>{
            AppDataSource.initialize().then(()=>{
                console.log("DB connected");
                resolve("DB connected")
            }
            ).catch((error)=>{
                console.log("DB not connected");
                console.log(error);
                reject(error);
            })
        })
    }
    /**
     * To save an entity
     * @param entity 
     */
    public static async save(entity : BaseEntity){
        return await AppDataSource.manager.save(entity);
    }
}