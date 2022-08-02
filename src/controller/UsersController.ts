import { NextFunction, Request, Response } from "express";
import { UserNameExistsException } from "../exception/UserNameExistsException";
import { Users, UserType } from "../model/entity/Users";
import { DBService } from "../service/DBService";
import { UsersService } from "../service/UsersService";
import * as bcrypt from 'bcrypt';
import { passwordHashCode } from "../../config/bootstrap";
import { UserDoesNotExistsException } from "../exception/UserDoesNotExistsException";
import { JsonWebToken } from "../utiles/JsonWebToken";
import { InvalidPasswordException } from "../exception/InvalidPasswordException";
export class UsersController {
    public register = async (request: Request,
        response: Response,
        next: NextFunction) => {
        try {
            const userName: string = request.body.user_name;
            const passWord: string = request.body.password;
            const type: UserType = request.body.type;
            const newUser = new Users();
            newUser.userName = userName;
            newUser.password = await bcrypt.hash(passWord, passwordHashCode);;
            newUser.type = type;
            const oldUser = await new UsersService().getUserByUserName(userName);

            if (oldUser)
                throw new UserNameExistsException();
            const result = await DBService.save(newUser);
            if (result) {
                response
                    .setHeader('Content-Type', 'application/json')
                    .status(200)
                    .send({ message: "User added succefully" })
                    .end();
            }
            else {
                next(new Error())
            }
        }
        catch (error) {

            next(error);
        }
    }

    public login = async (request: Request,
        response: Response,
        next: NextFunction) => {
        try {
            const userName: string = request.body.user_name;
            const passWord: string = request.body.password;
            const user: any = await new UsersService().getUserByUserName(userName);

            if (!user) {
                throw new UserDoesNotExistsException();
            }
            const isValidPassword: boolean = await bcrypt.compare(passWord, user.password);
            if (!isValidPassword) {
                throw new InvalidPasswordException();
            }
            const jwt: {
                access_token: string, token_type: string,
                expire_in: string
            } = new JsonWebToken().generateAccessToken({ id: user.id, user: userName, type: user.type });
            response.status(200)
                .json({ jwt: jwt }).end();
        }
        catch (error) {
            next(error);
        }
    }

    public getSeller = async (request: Request,
        response: Response,
        next: NextFunction)=>{
            try{
                const sellers: Users[] = await new UsersService().getSeller();
                const sellersdetails = sellers.map((seller: Users)=>{
                    return {id: seller.id,user_name:seller.userName};
                })
                response.status(200).json({sellers: sellersdetails}).end();
            }
            catch(error){
                next(error);
            }

    }
    
}