const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError.js');

module.exports = {
  addCategoryGet: async (req, res, next) => {
    res.send('Category add get');
  },
  addCategoryPost: async (req, res, next) => {
    res.send('Category add post');
  },
};
