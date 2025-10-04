module.exports = function (sequelize, DataTypes) {
  const Country = sequelize.define(
    'Country',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      countryName: {
        type: DataTypes.STRING,
        index: true,
      },
      iso2: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
    },
  );

  return Country;
};
