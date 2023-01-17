import { Sequelize } from 'sequelize';

import * as dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST as string;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbDialect = 'mysql';

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

export default sequelize;
