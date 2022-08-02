import { FOR_BIDDEN } from "../../config/constants";

export class ForBidden extends Error{
    private _status: number;

    public get status(): number {
        return this._status;
    }

    public set status(status: number) {
        this._status = status;
    }

    constructor(){
        super(FOR_BIDDEN);
        this._status = 403;
    }      
}