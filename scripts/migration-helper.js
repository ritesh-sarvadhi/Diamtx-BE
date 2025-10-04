#!/usr/bin/env node

/**
 * Migration Helper Script
 * Provides easy commands for managing database migrations
 */

const { execSync } = require('child_process');

function runCommand(command) {
  try {
    console.log(`Running: ${command}`);
    const output = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    return output;
  } catch (error) {
    console.error(`Error running command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
🗄️  Migration Helper Script

Usage: node scripts/migration-helper.js [command]

Commands:
  create <name>           Create a new migration file
  run                     Run all pending migrations
  status                  Show migration status
  undo                    Undo the last migration
  undo-all                Undo all migrations
  seed                    Run all seeders
  seed-undo               Undo all seeders
  reset                   Reset database (undo all migrations and seeders)
  help                    Show this help message

Examples:
  node scripts/migration-helper.js create add-user-roles
  node scripts/migration-helper.js run
  node scripts/migration-helper.js status
`);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'create':
      const migrationName = args[1];
      if (!migrationName) {
        console.log('Please provide a migration name.');
        console.log('Example: node scripts/migration-helper.js create add-user-roles');
        return;
      }
      runCommand(`npx sequelize-cli migration:generate --name ${migrationName}`);
      break;

    case 'run':
      runCommand('npx sequelize-cli db:migrate');
      break;

    case 'status':
      runCommand('npx sequelize-cli db:migrate:status');
      break;

    case 'undo':
      runCommand('npx sequelize-cli db:migrate:undo');
      break;

    case 'undo-all':
      runCommand('npx sequelize-cli db:migrate:undo:all');
      break;

    case 'seed':
      runCommand('npx sequelize-cli db:seed:all');
      break;

    case 'seed-undo':
      runCommand('npx sequelize-cli db:seed:undo:all');
      break;

    case 'reset':
      console.log('⚠️  This will reset your entire database!');
      console.log('Undoing all migrations and seeders...');
      runCommand('npx sequelize-cli db:migrate:undo:all');
      runCommand('npx sequelize-cli db:seed:undo:all');
      break;

    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;

    default:
      console.log('Unknown command. Use "help" to see available commands.');
      showHelp();
  }
}

main();
