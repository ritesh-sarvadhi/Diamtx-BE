module.exports = function (sequelize, DataTypes) {
  const CustomSetting = sequelize.define(
    'CustomSetting',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      partyId: {
        type: DataTypes.BIGINT,
      },
      type: {
        type: DataTypes.INTEGER,
      },
      column: {
        type: DataTypes.JSONB,
      },
      showHeader: {
        type: DataTypes.BOOLEAN,
      },
      showTotal: {
        type: DataTypes.BOOLEAN,
      },
      showRowNo: {
        type: DataTypes.BOOLEAN,
      },
      showFilter: {
        type: DataTypes.BOOLEAN,
      },
      isRowFreeze: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      withData: {
        type: DataTypes.BOOLEAN,
      },
      fileType: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return CustomSetting;
};
