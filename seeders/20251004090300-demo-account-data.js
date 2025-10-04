'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Account', [
      {
        id: 1,
        categories: [ 1, 2, 3 ],
        name: 'Demo Company Ltd',
        shortCode: 'DEMO001',
        birthDate: new Date('1990-01-15'),
        registrationDate: new Date('2020-01-01'),
        email1: 'contact@democompany.com',
        email2: 'info@democompany.com',
        mobileNo: '+1234567890',
        phoneNo: '+1234567891',
        contactPersonName: 'John Doe',
        country: 1,
        zipCode: 12345,
        faxNo: '+1234567892',
        isActive: true,
        employeeId: 1,
        companyId: 1,
        departmentId: 1,
        businessTypeId: 1,
        businessTypeName: 'Technology',
        premises: 'Main Office',
        loginType: true,
        assistantSalesPersonId: 1,
        mobileNoCc: '+1',
        phoneNoCc: '+1',
        phoneNoNdc: '234',
        faxNoNdc: '234',
        faxNoCc: '+1',
        remark: 'Demo account for testing',
        gstNo: 'GST123456789',
        website: 'https://democompany.com',
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        categories: [ 2, 4 ],
        name: 'Sample Corporation',
        shortCode: 'SAMP002',
        birthDate: new Date('1985-05-20'),
        registrationDate: new Date('2019-06-15'),
        email1: 'hello@samplecorp.com',
        email2: 'support@samplecorp.com',
        mobileNo: '+9876543210',
        phoneNo: '+9876543211',
        contactPersonName: 'Jane Smith',
        country: 2,
        zipCode: 54321,
        faxNo: '+9876543212',
        isActive: true,
        employeeId: 2,
        companyId: 2,
        departmentId: 2,
        businessTypeId: 2,
        businessTypeName: 'Manufacturing',
        premises: 'Factory Location',
        loginType: false,
        assistantSalesPersonId: 2,
        mobileNoCc: '+9',
        phoneNoCc: '+9',
        phoneNoNdc: '876',
        faxNoNdc: '876',
        faxNoCc: '+9',
        remark: 'Sample corporation account',
        gstNo: 'GST987654321',
        website: 'https://samplecorp.com',
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Reset the sequence for the Account table
    await queryInterface.sequelize.query('ALTER SEQUENCE "Account_id_seq" RESTART WITH 3;');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Account', null, {});
  }
};
