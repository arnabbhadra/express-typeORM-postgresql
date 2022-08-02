import { NextFunction, Request, Response } from "express";
import { InvalidItemException } from "../exception/InvalidItemException";
import { UserDoesNotExistsException } from "../exception/UserDoesNotExistsException";
import { Orders } from "../model/entity/Orders";
import { Products } from "../model/entity/Products";
import { Users } from "../model/entity/Users";
import { DBService } from "../service/DBService";
import { OrdersService } from "../service/OrdersService";
import { ProductService } from "../service/ProductService";
import { UsersService } from "../service/UsersService";

export class OrdersController{
    public create = async (request: Request,
        response: Response,
        next: NextFunction) =>{
            try{
                const seller : boolean | Users = await new UsersService().getSellerByID(request.params['seller_id']);
                if( seller instanceof Users){
                    const buyer: boolean | Users = await new UsersService().getBuyerByID(request.body.buyer_id);
                    const order: Orders = new Orders;
                    //@ts-ignore
                    order.buyer = buyer;
                    order.seller = seller;
                    const items: Array<{id: string}> = request.body.items;
                    let productsPromise: any =[]
                    items.map(async (item:{id: string})=>{
                        

                        const promise = new Promise((resolve,reject)=>{
                            new ProductService().get(item.id).then((product)=>{
                                resolve(product);
                            }).catch((error)=>{
                                reject(error);
                            })
                        })
                        productsPromise.push(promise);
                    });
                    Promise.all(productsPromise).then(
                        async (products)=>{
                            
                            order.products = products;
                            await DBService.save(order);
                            response.status(200).json({message:"order is complete"});
                        }
                    ).catch((error)=>{ 
                        next(new InvalidItemException());
                    })
                }
                else{
                    throw new UserDoesNotExistsException();
                }
            }
            catch(error){
                next(error);
            }
        }
    public get = async (request: Request,
        response: Response,
        next: NextFunction)=>{
            try{
                const seller_id : string = request.body.seller_id;
                await new OrdersService().get(seller_id);
                const orders: Array<{id: string, placed_on: Date }> = (await new OrdersService().get(seller_id)).map((order: Orders)=>{
                    return {id: order.id, "placed_on" : order.createdOn}
                });

                response.status(200).json({orders: orders}).end(); 
            }
            catch(error){
                next(error);
            }
        }
}