
module.exports = function (sequelize, DataTypes) {
  const Master = sequelize.define(
    'Master',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      likeKeyword: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT,
      },
      boxTypeId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      sequence: {
        type: DataTypes.INTEGER,
      },
      groupName: {
        type: DataTypes.STRING,
      },
      parentId: {
        allowNull: true,
        type: DataTypes.BIGINT,
        references: {
          model: 'Master',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      },
      groupId: {
        allowNull: true,
        type: DataTypes.BIGINT,
        references: {
          model: 'Master',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      },
      days: {
        type: DataTypes.INTEGER,
      },
      percentage: {
        type: DataTypes.FLOAT,
      },
      labProcessId: {
        type: DataTypes.BIGINT,
      },
      isWebDisplay: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      parentCode: {
        type: DataTypes.STRING,
      },
      mainGroupSequence: {
        type: DataTypes.INTEGER,
      },
      mainGroup: {
        type: DataTypes.STRING,
      },
      display_sequence: {
        type: DataTypes.INTEGER,
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
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: true
    },
  );

  return Master;
};
