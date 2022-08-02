import { INVALID_ITEM } from "../../config/constants";

export class InvalidItemException extends Error {
    private _status: number;

    public get status(): number {
        return this._status;
    }

    public set status(status: number) {
        this._status = status;
    }

    constructor() {
        super(INVALID_ITEM);
        this._status = 400;
    }
}