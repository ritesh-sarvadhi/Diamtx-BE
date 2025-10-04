import { createJWToken } from '../config/auth';
import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Please use a different username',
      }
    },
    email: {
      type: DataTypes.STRING,
    },
    email2: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.BIGINT,
    },
    refId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    isApiTrue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    dayTermsId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    dayTermsName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    loginType: {
      type: DataTypes.STRING,
      index: true
    },
    companyId: {
      type: DataTypes.BIGINT,
    },
    departmentId: {
      type: DataTypes.BIGINT,
    },
    termsId: {
      type: DataTypes.BIGINT,
    },
    createdBy: {
      type: DataTypes.BIGINT,
    },
    updatedBy: {
      type: DataTypes.BIGINT,
    },
    deletedBy: {
      type: DataTypes.BIGINT,
    },
    accessToken: {
      type: DataTypes.STRING,
    },
    userLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
    },
    isEmployee: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    logoutAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'User'
  });

  User.beforeSave(user => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    }
  });

  User.prototype.generateToken = function generateToken() {
    console.log('JWT:' + process.env.SECRET);
    return createJWToken({ email: this.email, id: this.id });
  };

  User.prototype.authenticate = function authenticate(value) {
    if (bcrypt.compareSync(value, this.password))
      return this;
    else
      return false;
  };
  return User;
};
