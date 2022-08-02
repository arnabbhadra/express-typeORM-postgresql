import { AppDataSource } from "../../config/appDataSource"
import { Catalogs } from "../model/entity/Catalogs"
import { Products } from "../model/entity/Products"

export class ProductService{
    public getProducts = async(catalogId: string)=>{
        const relations = AppDataSource.getMetadata(Products).relations.map((relation)=>{
            return relation.propertyName;
        })
        //@ts-ignore
        return (await AppDataSource.getRepository(Products).find({relations: relations})).filter((product)=>{
            return product.catalog.id === catalogId
        })
    }

    public get = async(id: string)=>{
        //@ts-ignore
        return await AppDataSource.getRepository(Products).findOne({where:{_id:id}});
    }
}