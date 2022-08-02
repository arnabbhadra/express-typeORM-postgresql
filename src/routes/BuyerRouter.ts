import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { CatalogsController } from "../controller/CatalogsController";
import { OrdersController } from "../controller/OrdersController";
import { UsersController } from "../controller/UsersController";
import { AccessControlMiddleware } from "../middleware/AccessControlMiddleware";

export const BuyerRouter  : Router = Router();

BuyerRouter.get('/list-of-sellers',
    new AccessControlMiddleware().buyerAccessControl,
    new UsersController().getSeller);
BuyerRouter.get('/seller-catalog/:seller_id',
    new AccessControlMiddleware().buyerAccessControl,
    new CatalogsController().get
)
BuyerRouter.post('/create-order/:seller_id',
    new AccessControlMiddleware().buyerAccessControl,
    body('items')
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
    new OrdersController().create
    )
