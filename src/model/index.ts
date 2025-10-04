import { Sequelize } from 'sequelize';
import { sequelize } from '../config/connectDb';
import { userModel } from './userRegistration';

export const db = {
    Sequelize,
    sequelize,
    userModel

}

db.sequelize.sync();