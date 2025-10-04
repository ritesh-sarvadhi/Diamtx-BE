module.exports = function (sequelize, DataTypes) {
  const Account = sequelize.define(
    'Account', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      categories: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Name must be unique',
        },
      },
      shortCode: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Party Code must be unique',
        },
      },
      birthDate: {
        type: DataTypes.DATE,
      },
      registrationDate: {
        type: DataTypes.DATE,
      },
      email1: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email2: {
        type: DataTypes.STRING,
      },
      mobileNo: {
        type: DataTypes.STRING,
      },
      phoneNo: {
        type: DataTypes.STRING,
      },
      contactPersonName: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.BIGINT,
      },
      zipCode: {
        type: DataTypes.INTEGER,
      },
      faxNo: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      employeeId: {
        type: DataTypes.BIGINT,
      },
      companyId: {
        type: DataTypes.BIGINT,
      },
      departmentId: {
        type: DataTypes.BIGINT,
      },
      businessTypeId: {
        type: DataTypes.BIGINT,
      },
      businessTypeName: {
        type: DataTypes.STRING,
      },
      premises: {
        type: DataTypes.STRING,
      },
      loginType: {
        type: DataTypes.BOOLEAN,
      },
      assistantSalesPersonId: {
        type: DataTypes.BIGINT,
      },
      mobileNoCc: {
        type: DataTypes.STRING,
      },
      phoneNoCc: {
        type: DataTypes.STRING,
      },
      phoneNoNdc: {
        type: DataTypes.STRING,
      },
      faxNoNdc: {
        type: DataTypes.STRING,
      },
      faxNoCc: {
        type: DataTypes.STRING,
      },
      remark: {
        type: DataTypes.STRING,
      },
      gstNo: {
        type: DataTypes.STRING,
      },
      website: {
        type: DataTypes.STRING,
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
    }, {
      timestamps: true,
      freezeTableName: true,
      paranoid: true
    }
  );
  return Account;
};