"use strict";
import { Sequelize } from "sequelize";
import config from "../config.mjs";

const dbName = config.DB_NAME;
const dbUser = config.DB_USERNAME;
const dbHost = config.DB_HOST;
const dbStorage = config.DB_STORAGE;
const dbPassword = config.DB_PASSWORD;

/*
if dialect is different from sqlite
let dbParam2:{host?:string, storage?:string, logging?:boolean, dialect:string} = {
    host:dbHost,
    dialect:dbDialect
} ;
*/
const db = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        storage: dbStorage,
        dialect: 'sqlite'
    }
)

export default db;