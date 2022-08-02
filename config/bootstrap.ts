import dotenv from 'dotenv';
import path from 'path';
import * as envalid from 'envalid';
dotenv.config({path: path.join(__dirname, `./.env`)});
const env = envalid.cleanEnv(process.env,{
    DB_TYPE: envalid.str(),
    DB_HOSTNAME: envalid.host(),
    DB_PORT: envalid.port(),
    DB_USER: envalid.str(),
    DB_PASSWORD: envalid.str(),
    DB_DATABASE: envalid.str(),
    PORT: envalid.port(),
    ORM_DB_NAME: envalid.str(),
    PASSWORD_HASH_CODE: envalid.num()
})

export const dbType : any = env.DB_TYPE;
export const dbHostName : string = env.DB_HOSTNAME;
export const dbport : number = env.DB_PORT;
export const dbUser : string = env.DB_USER;
export const dbPassword : string = env.DB_PASSWORD;
export const dbDatabase : string = env.DB_DATABASE;
export const port : number = env.PORT;
export const ormDBName : string = env.ORM_DB_NAME;
export const passwordHashCode: number = env.PASSWORD_HASH_CODE;