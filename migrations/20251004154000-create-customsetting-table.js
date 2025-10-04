'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomSetting', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      partyId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      column: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      showHeader: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      showTotal: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      showRowNo: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      showFilter: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isRowFreeze: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      withData: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fileType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CustomSetting');
  },
};
