const pkg = require('../../package.json');

module.exports = {
  projectName: process.env.PROJECT_NAME || pkg.name
};
