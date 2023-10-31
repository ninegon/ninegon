const PACKAGE_VERSION = require("./package.json").version;
const chalk = require('chalk');
console.log(chalk.blue('---------------------------------------'))
console.log()
console.log(chalk.blue('Versión de la aplicación'));
console.error('     ' + PACKAGE_VERSION);
console.log()
console.log(chalk.blue('---------------------------------------'))