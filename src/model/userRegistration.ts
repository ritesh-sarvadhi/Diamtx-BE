import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDb';
import { UserSchema } from '../utils';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';

export const userModel = sequelize.define<UserSchema>('users', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['admin', 'user']
    }
});
userModel.beforeSave(data => {
    if (data.changed('password')) {
        data.password = hashSync(data.password, genSaltSync(12))
    }
});
userModel.prototype.authenticate = function (val: string) {
    if (compareSync(val, this.password)) {
        return this;
    } else {
        return false;
    }
}