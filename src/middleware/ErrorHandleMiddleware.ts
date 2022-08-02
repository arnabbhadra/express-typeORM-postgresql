import { NextFunction, Request, response, Response } from "express";
import { GENERAL_ERROR } from "../../config/constants";

export class ErrorHandleMiddleware {
    public static errorHandler = function (err: any,
        request: Request, response: Response,
        next: NextFunction) {
        let error: any = {};
        if (err && err.status && err.message) {
            error = err;
        } else {
            error.message = err.stack || err.message ||
                err ||
                GENERAL_ERROR;
        }
        
        const errorCode : number = error.status || 500;
        response.setHeader('Content-Type', 'application/json')
        .status(errorCode).send({error: error.message}).end();
    }
    
}
