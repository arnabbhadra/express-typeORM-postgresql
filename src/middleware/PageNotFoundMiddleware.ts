import { NextFunction, Request, Response } from "express";
import { PageNotFoundException } from "../exception/PageNotFoundException";

export class PageNotFoundMiddleware {
    public static pageNotFound = function (req: Request,
        res: Response,
        next: NextFunction): void {
        const pageNotFountException: PageNotFoundException =
            new PageNotFoundException();
        next(pageNotFountException);
    }
}