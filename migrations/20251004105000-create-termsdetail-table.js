'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TermsDetail', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      refId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      currencyId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      currencyPercentage: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      dayTermsId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      dayTermsPercentage: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      extraDollar: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      extraPercentage: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      rapPercentage: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      creditLimit: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      memoLimit: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      aadat: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      broker: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      totalPercentage: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      verifiedTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      verifiedBy: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      editStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      termName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currencyName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deliveryTypeName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dayTermsName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      totalPercentageFinal: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      updatedBy: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      deletedBy: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.addIndex('TermsDetail', ['refId'], {
      name: 'idx_termsdetail_refid'
    });

    await queryInterface.addIndex('TermsDetail', ['currencyId'], {
      name: 'idx_termsdetail_currencyid'
    });

    await queryInterface.addIndex('TermsDetail', ['dayTermsId'], {
      name: 'idx_termsdetail_daytermsid'
    });

    await queryInterface.addIndex('TermsDetail', ['isDefault'], {
      name: 'idx_termsdetail_isdefault'
    });

    await queryInterface.addIndex('TermsDetail', ['deletedAt'], {
      name: 'idx_termsdetail_deletedat'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('TermsDetail', 'idx_termsdetail_refid');
    await queryInterface.removeIndex('TermsDetail', 'idx_termsdetail_currencyid');
    await queryInterface.removeIndex('TermsDetail', 'idx_termsdetail_daytermsid');
    await queryInterface.removeIndex('TermsDetail', 'idx_termsdetail_isdefault');
    await queryInterface.removeIndex('TermsDetail', 'idx_termsdetail_deletedat');
    await queryInterface.dropTable('TermsDetail');
  }
};
