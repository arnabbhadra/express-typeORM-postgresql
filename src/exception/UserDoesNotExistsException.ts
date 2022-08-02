import { USER_DOES_NOT_EXISTS } from "../../config/constants";

export class UserDoesNotExistsException extends Error{
    private _status: number;

    public get status(): number {
        return this._status;
    }

    public set status(status: number) {
        this._status = status;
    }

    constructor(){
        super(USER_DOES_NOT_EXISTS);
        this._status = 400;
    }    
}