import { NextFunction, Request, Response } from "express";
import { JsonWebToken } from "../utiles/JsonWebToken";
import * as jwt from 'jsonwebtoken';
import { UnAuthorizedClientException } from "../exception/UnAuthorizedClientException";
import { ForBidden } from "../exception/ForBidden";
export class AccessControlMiddleware {
    public buyerAccessControl = (request: Request,
        response: Response,
        next: NextFunction) => {
        try {
            const token: any = this.getJWT(request);
            if (token.type === 'buyer'){
                request.body.seller_id = token.id;
                next();
            }
                
            else
                throw new ForBidden();

        }
        catch (error) {
            next(error);
        }

    }

    public sellerAccessControl = (request: Request,
        response: Response,
        next: NextFunction) => {
        try {
            
            const token: any= this.getJWT(request);           
            if (token.type === 'seller'){
                request.body.seller_id = token.id;
                next();
            }
            else
                throw new ForBidden();

        }
        catch (error) {
            next(error);
        }

    }

    private getJWT = (request: Request) => {
        const authHeader: string | undefined =
            request.headers?.authorization;
        if (!authHeader) {
            throw new UnAuthorizedClientException();
        }
        try {
            return new JsonWebToken().verifyAccessToken(authHeader.split(' ')[1]);
        }
        catch (error) {
            throw new UnAuthorizedClientException();
        }
    }
}