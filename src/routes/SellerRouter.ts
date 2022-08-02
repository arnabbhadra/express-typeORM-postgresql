import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { CatalogsController } from "../controller/CatalogsController";
import { OrdersController } from "../controller/OrdersController";
import { AccessControlMiddleware } from "../middleware/AccessControlMiddleware";

export const SellerRouter = Router();
SellerRouter.post("/create-catalog", 
    new AccessControlMiddleware().sellerAccessControl,
    body('products')
        .notEmpty(),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array().map((result) => { return result.msg }) });
        }
        else {
            next();
        }
    },
    new CatalogsController().create);

SellerRouter.get("/orders",
    new AccessControlMiddleware().sellerAccessControl,
    new OrdersController().get

)