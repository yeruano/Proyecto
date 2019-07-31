import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(

    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,

    {

        host: process.env.HOST,
        dialect: 'postgres',

        pool: {

            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000

        },

        logging: false

    }

);

export default sequelize;
