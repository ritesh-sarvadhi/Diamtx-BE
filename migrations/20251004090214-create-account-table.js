'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Account', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      categories: {
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      shortCode: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      email1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mobileNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      contactPersonName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      zipCode: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      faxNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      employeeId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      companyId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      departmentId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      businessTypeId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      businessTypeName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      premises: {
        type: Sequelize.STRING,
        allowNull: true
      },
      loginType: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      assistantSalesPersonId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      mobileNoCc: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNoCc: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNoNdc: {
        type: Sequelize.STRING,
        allowNull: true
      },
      faxNoNdc: {
        type: Sequelize.STRING,
        allowNull: true
      },
      faxNoCc: {
        type: Sequelize.STRING,
        allowNull: true
      },
      remark: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gstNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      website: {
        type: Sequelize.STRING,
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

    // Add indexes for better performance
    await queryInterface.addIndex('Account', ['name'], {
      name: 'idx_account_name'
    });

    await queryInterface.addIndex('Account', ['shortCode'], {
      name: 'idx_account_shortcode'
    });

    await queryInterface.addIndex('Account', ['email1'], {
      name: 'idx_account_email1'
    });

    await queryInterface.addIndex('Account', ['isActive'], {
      name: 'idx_account_isactive'
    });

    await queryInterface.addIndex('Account', ['deletedAt'], {
      name: 'idx_account_deletedat'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Account');
  }
};
