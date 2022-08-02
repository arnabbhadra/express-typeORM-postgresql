import {PAGE_NOT_FOUND} from "../../config/constants";

export class PageNotFoundException extends Error{
    private _status: number;

    public get status(): number {
        return this._status;
    }

    public set status(status: number) {
        this._status = status;
    }

    constructor(){
        super(PAGE_NOT_FOUND);
        this._status = 400;
    }    
}