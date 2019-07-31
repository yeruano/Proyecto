import Sequelize from 'sequelize';
import  sequelize  from '../database/database';
import RoleModel from './RoleModel';

const UserModel = sequelize.define('users',

    {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        username: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }

    },
    
    {

        timestamps: false,
        underscored: true,
        freezeTableName: true

    }

);

UserModel.belongsTo(RoleModel, {
    foreignKey: 'role_id'
}); // roleId

export default UserModel;
