module.exports = function (sequelize, DataTypes) {
  const State = sequelize.define(
    'State',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      stateName: {
        type: DataTypes.STRING,
        index: true,
      },
      countryId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'Country',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      },
      stateCode: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
    },
  );

  return State;
};
