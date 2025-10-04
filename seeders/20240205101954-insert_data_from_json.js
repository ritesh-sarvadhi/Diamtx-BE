'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const files = [
        '../src/assets/mockData/Country.json',
        '../src/assets/mockData/State.json',
        '../src/assets/mockData/City.json',
      ];

      for (const file of files) {
        const jsonData = fs.readFileSync(path.join(__dirname, file));
        const data = JSON.parse(jsonData);
        const tableName = path.basename(file, '.json');
        await queryInterface.bulkInsert(tableName, data, {});
      }

      return Promise.resolve();
    } catch (error) {
      console.error('Error seeding data:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const tables = ['City', 'State', 'Country'];
      for (const table of tables) {
        await queryInterface.bulkDelete(table, null, {});
      }

      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting seeded data:', error);
      throw error;
    }
  }
};
