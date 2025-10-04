module.exports = function (sequelize, DataTypes) {
  const TermsDetail = sequelize.define(
    'TermsDetail', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      refId: {
        type: DataTypes.BIGINT,
        // reference to account table
      },
      currencyId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      currencyPercentage: {
        type: DataTypes.FLOAT,
      },
      dayTermsId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      dayTermsPercentage: {
        type: DataTypes.FLOAT,
      },
      extraDollar: {
        type: DataTypes.FLOAT,
      },
      extraPercentage: {
        type: DataTypes.FLOAT,
      },
      rapPercentage: {
        type: DataTypes.FLOAT,
      },
      creditLimit: {
        type: DataTypes.FLOAT,
      },
      memoLimit: {
        type: DataTypes.FLOAT,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      aadat: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      broker: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      totalPercentage: {
        type: DataTypes.FLOAT,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      verifiedTime: {
        type: DataTypes.DATE,
      },
      verifiedBy: {
        type: DataTypes.BIGINT,
      },
      editStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      termName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accountName: {
        type: DataTypes.STRING,
      },
      currencyName: {
        type: DataTypes.STRING,
        allowNull: false

      },
      deliveryTypeName: {
        type: DataTypes.STRING,
      },
      dayTermsName: {
        type: DataTypes.STRING,
        allowNull: false

      },
      totalPercentageFinal: {
        type: DataTypes.FLOAT,
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

  return TermsDetail;
};
