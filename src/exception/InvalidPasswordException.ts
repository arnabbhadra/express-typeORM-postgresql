import { INVALID_PASSWORD } from "../../config/constants";

export class InvalidPasswordException extends Error{
    private _status: number;

    public get status(): number {
        return this._status;
    }

    public set status(status: number) {
        this._status = status;
    }

    constructor(){
        super(INVALID_PASSWORD);
        this._status = 400;
    }      
}