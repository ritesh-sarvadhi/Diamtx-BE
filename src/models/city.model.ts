module.exports = function (sequelize, DataTypes) {
  const City = sequelize.define(
    'City',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cityName: {
        type: DataTypes.STRING,
        index: true,
      },
      stateId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'State',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
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
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
    },
  );

  return City;
};
