const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError.js');

module.exports = {
  get: async (req, res, next) => {
    const items = await db.getItems();
    res.render('index', { title: 'Main inventory', items: items });
  },
  categoryGet: async (req, res, next) => {
    const { categoryId } = req.params;
    const items = await db.getItemsByCategory(categoryId);
    const title = await db.getCategoryById(categoryId);
    res.render('index', { title: `${title[0].name} inventory`, items: items });
  },
};
