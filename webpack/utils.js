const path = require('path');
const config = require('../config/path');

const makePath = function(_path) {
  return path.join(config.PROJECT_ROOT, _path);
};

module.exports = makePath;
