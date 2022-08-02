import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Products } from "./Products";
import { Users } from "./Users";
@Entity({name: 'orders'})
export class Orders extends BaseEntity{
    @PrimaryGeneratedColumn('uuid',{name: 'id'})
    private _id: string;
    @ManyToMany(()=>Products, (product)=> product.id,{cascade: true})
    @JoinTable({name: 'order_products'})
    private _products: Products[];
    @ManyToOne(()=>Users, (user: Users)=> user.id)
    @JoinColumn({name:"buyer_id"})
    private _buyer: Users;
    @ManyToOne(()=> Users, (user: Users)=> user.id)
    @JoinColumn({name:"seller_id"})
    private _seller: Users;
    @CreateDateColumn({name:'created_on'})
    private _createdOn: Date;
    @UpdateDateColumn({name: 'modified_on'})
    private _modifiedOn: Date;

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get products(): Products[] {
        return this._products;
    }

    public set products(products: Products[]) {
        this._products = products;
    }
    public get buyer(): Users {
        return this._buyer;
    }

    public set buyer(buyer: Users) {
        this._buyer = buyer;
    }

    public get seller(): Users {
        return this._seller;
    }

    public set seller(seller: Users) {
        this._seller = seller;
    }
    public get createdOn(): Date {
        return this._createdOn;
    }

    public set createdOn(createdOn: Date) {
        this._createdOn = createdOn;
    }

    public get modifiedOn(): Date {
        return this._modifiedOn;
    }

    public set modifiedOn(modifiedOn: Date) {
        this._modifiedOn = modifiedOn;
    }

}