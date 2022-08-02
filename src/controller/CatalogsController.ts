import { NextFunction, Request, Response } from "express";
import { UserDoesNotExistsException } from "../exception/UserDoesNotExistsException";
import { Catalogs } from "../model/entity/Catalogs";
import { Users } from "../model/entity/Users";
import { CatalogService } from "../service/CatalogService";
import { DBService } from "../service/DBService";
import { ProductService } from "../service/ProductService";
import { UsersService } from "../service/UsersService";
import { Products } from "./../model/entity/Products";
export class CatalogsController {
    public create = async (request: Request,
        response: Response,
        next: NextFunction) => {
        try {
            const seller: Users | boolean = await new UsersService().getSellerByID(request.body.id);
            if (seller instanceof Users) {
                try {
                    let catalog: Catalogs = new Catalogs();
                    catalog.seller = seller;
                    const products: Array<{ name: string, price: number }> = request.body.products;
                    const savedCatalog: any = await DBService.save(catalog);
                    products.map(async (product) => {
                        const productEntity: Products = new Products();
                        productEntity.name = product.name;
                        productEntity.price = product.price;
                        productEntity.catalog = savedCatalog;
                        return (await DBService.save(productEntity));;

                    });
                    response.status(200).json({ message: "Catalog added" }).end();
                }
                catch (error) {
                    throw error;
                }
            }
            else {
                throw new UserDoesNotExistsException();
            }
        }
        catch (error) {
            next(error);
        }
    }
    public get = async (request: Request,
        response: Response,
        next: NextFunction) => {
        try {
            const catalog: any = await new CatalogService().getSellerCatalog(request.params['seller_id']);
            
            if (!catalog) {
                throw new UserDoesNotExistsException();
            }
            const products: Array<{id: string, name: string, price: number}> = (await new ProductService().getProducts(catalog.id)).map((product: Products)=>{
                return {id: product.id, name: product.name, price : product.price}
            });
            
            response.status(200).json({ 'catalog': products }).end();
        }
        catch (error) {
            next(error);
        }

    }
}