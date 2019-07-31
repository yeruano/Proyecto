import Sequelize from 'sequelize';
import  sequelize  from '../database/database';

const RoleModel = sequelize.define('role',

    {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        }

    }

);

export default RoleModel;
