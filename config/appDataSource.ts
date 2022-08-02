import { DataSource } from 'typeorm';
import { Catalogs } from '../src/model/entity/Catalogs';
import { Orders } from '../src/model/entity/Orders';
import { Products } from '../src/model/entity/Products';
import { Users } from '../src/model/entity/Users';
import {
  dbType, dbHostName, dbport, dbUser,
  dbPassword, dbDatabase, ormDBName
} from './bootstrap';
export const AppDataSource: DataSource = new DataSource({
  'name': ormDBName,
  'type': dbType,
  'host': dbHostName,
  'port': Number(dbport),
  'username': dbUser,
  'password': dbPassword,
  'database': dbDatabase,
  'synchronize': true,
  'logging': false,
  'entities': [
    Users, Orders, Catalogs, Products
  ],

});