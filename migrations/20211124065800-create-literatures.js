'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('literatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model : "users",
          key : "id"
        },
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
      },
      publication_date: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.INTEGER
      },
      ISBN: {
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      attache: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      isbnn: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('literatures');
  }
};