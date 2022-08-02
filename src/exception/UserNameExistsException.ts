import { USER_EXISTS } from "../../config/constants";

export class UserNameExistsException extends Error{
    private _status: number;

    public get status(): number {
        return this._status;
    }

    public set status(status: number) {
        this._status = status;
    }

    constructor(){
        super(USER_EXISTS);
        this._status = 400;
    }
}
