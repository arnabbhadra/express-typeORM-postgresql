import { AppDataSource } from "../../config/appDataSource"
import { Users } from "../model/entity/Users"

export class UsersService{
    public getUserByUserName = async (userName: string): Promise<Users|boolean>=>{
        //@ts-ignore
        const user: Users = await AppDataSource.getRepository(Users).findOne({where:{_userName: userName}});
        if(user)
            return user;
        else   
            return false;
    }

    public getSeller = async(): Promise<Users[]>=>{
        //@ts-ignore
        const sellers : Users[] = await AppDataSource.getRepository(Users).find({where:{_type: 'seller'}});
        return sellers;
    }

    public getSellerByID = async (id: string): Promise<Users|boolean> =>{
        //@ts-ignore
        const seller: Users = await AppDataSource.getRepository(Users).findOne({where:{_type: 'seller',_id:id}});
        if(seller)
            return seller;
        else   
            return false;
    }

    public getBuyerByID = async (id: string): Promise<Users|boolean> =>{
        //@ts-ignore
        const seller: Users = await AppDataSource.getRepository(Users).findOne({where:{_type: 'buyer',_id:id}});
        if(seller)
            return seller;
        else   
            return false;
    }
    
}