import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Products } from "./Products";
import { Users } from "./Users";

@Entity({name: 'catalogs'})
export class Catalogs extends BaseEntity{
    @PrimaryGeneratedColumn('uuid',{name: 'id'})
    private _id: string;
    @OneToOne(()=> Users)
    @JoinColumn({name: 'seller'})
    private _seller: Users;
    @OneToMany(()=> Products,(product: Products)=> product.id)
    
    private _products: Products[];
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

    public get seller(): Users {
        return this._seller;
    }

    public set seller(seller: Users) {
        this._seller = seller;
    }

    public get products(): Products[] {
        return this._products;
    }

    public set products(products: Products[]) {
        this._products = products;
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