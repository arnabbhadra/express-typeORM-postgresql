import { AppDataSource } from "../../config/appDataSource";
import { Orders } from "../model/entity/Orders";

export class OrdersService{
    public get= async (id: string)=>{
        const relations = AppDataSource.getMetadata(Orders).relations.map((relation)=>{
            return relation.propertyName;
        })
        return (await AppDataSource.getRepository(Orders).find({relations: relations,
        }
        )).filter((order)=>{
            return order.seller.id === id;
        })
    }
}