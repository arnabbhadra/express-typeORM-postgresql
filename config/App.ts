import express from 'express'
import bodyParser from 'body-parser';
import { PageNotFoundMiddleware } from '../src/middleware/PageNotFoundMiddleware';
import { ErrorHandleMiddleware } from '../src/middleware/ErrorHandleMiddleware';
import { AuthRouter } from '../src/routes/AuthRouter';
import { BuyerRouter } from '../src/routes/BuyerRouter';
import { SellerRouter } from '../src/routes/SellerRouter';
export const App: express.Application = express(); 
App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());
App.use("/api/auth",AuthRouter);
App.use("/api/buyer",BuyerRouter);
App.use("/api/seller", SellerRouter);
App.use(PageNotFoundMiddleware.pageNotFound);
App.use(ErrorHandleMiddleware.errorHandler);