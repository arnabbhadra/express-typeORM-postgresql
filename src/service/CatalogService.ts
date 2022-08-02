import { AppDataSource } from "../../config/appDataSource";
import { Catalogs } from "../model/entity/Catalogs";

export class CatalogService{
    public getSellerCatalog = async(id: string )=>{
        const relations = AppDataSource.getMetadata(Catalogs).relations.map((relation)=>{
            return relation.propertyName;
        });
        
        
        const catalogs = await AppDataSource.getRepository(Catalogs).find({relations: ['_seller']});
        
        //@ts-ignore
        return (catalogs
        .filter((catalog:Catalogs)=>{
            return catalog.seller.id === id;
        }))[0]
    }
}