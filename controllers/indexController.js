const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError.js');

module.exports = {
  get: (req, res, next) => {
    res.render('index', { title: 'Main page' });
  },
};
