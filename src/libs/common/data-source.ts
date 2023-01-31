import "reflect-metadata"
import { DataSource } from "typeorm"
const dotenv = require('dotenv')
dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.host,
    port: Number(process.env.port),
    username:  process.env.username,
    password: process.env.password,
    database: process.env.database,
    entities: ['./src/entity/*.ts'],
    synchronize: true,
    logging: false,
    migrations: [],
    subscribers: [],

    })

// console.log(process.env.port)    