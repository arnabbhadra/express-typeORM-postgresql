import { NextFunction, Request, Response, Router } from "express";
import { UsersController } from "../controller/UsersController";
import {body, param, validationResult} from 'express-validator';
export const AuthRouter: Router = Router();

AuthRouter.post("/register", 

    body('user_name')
    .notEmpty()
    .withMessage("User name should not be empty"),
    body('password')
    .notEmpty()
    .withMessage("Pass word should not be empty"),
    body('type')
    .notEmpty()
    .withMessage("Type should not be empty")
    .bail()
    .isIn(["buyer", "seller"])
    .withMessage("Type should be either user or seller"),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.status(400).json({ errors: errors.array().map((result)=>{ return result.msg}) });
        }
        else{
            next();
        }
    },
    new UsersController().register);

AuthRouter.post("/login",
    body('user_name')
    .notEmpty()
    .withMessage("User name should not be empty"),
    body('password')
    .notEmpty()
    .withMessage("Pass word should not be empty"),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.status(400).json({ errors: errors.array().map((result)=>{ return result.msg}) });
        }
        else{
            next();
        }
    },
    new UsersController().login
)
