import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Catalogs } from "./Catalogs";
@Entity({name:'products'})
export class Products extends BaseEntity{
    @PrimaryGeneratedColumn('uuid',{name: 'id'})
    private _id: string;
    @Column({name: 'name'})
    private _name: string;
    @Column({name:'price', type:'int'})
    private _price : number;
    @ManyToOne(()=>Catalogs,(catalog: Catalogs)=> catalog.id)
    @JoinColumn({name:'catalog_id'})
    private _catalog : Catalogs;

    public get catalog(): Catalogs {
        return this._catalog;
    }

    public set catalog(catalog: Catalogs) {
        this._catalog = catalog;
    }


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

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get price(): number {
        return this._price;
    }

    public set price(price: number) {
        this._price = price;
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