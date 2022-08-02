import { UNAUTHORIZED_ACCRESS } from "../../config/constants";

export class UnAuthorizedClientException extends Error{
    private _status: number;

    public get status(): number {
        return this._status;
    }

    public set status(status: number) {
        this._status = status;
    }

    constructor(){
        super(UNAUTHORIZED_ACCRESS);
        this._status = 401;
    }      
}