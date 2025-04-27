const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError.js');

module.exports = {
  get: async (req, res, next) => {
    const items = await db.getItems();
    res.render('index', { title: 'Main inventory', items: items });
  },
};
