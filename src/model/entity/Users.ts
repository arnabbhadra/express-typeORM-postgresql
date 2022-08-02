import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export type UserType = "buyer | seller";
@Entity({name:'users'})
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn('uuid',{name: 'id'})
    private _id: string;
    @Column({name: 'user_name'})
    private _userName: string;
    @Column({name: 'password'})
    private _password: string;
    @Column({name: 'type', type:'enum', enum:["buyer","seller"]})
    private _type: UserType;
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

    public get userName(): string {
        return this._userName;
    }

    public set userName(userName: string) {
        this._userName = userName;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get type(): UserType {
        return this._type;
    }

    public set type(type: UserType) {
        this._type = type;
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