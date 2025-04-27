const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError.js');

module.exports = {
  updateItemGet: async (req, res, next) => {
    const { itemId } = req.params;
    const item = await db.getItemById(itemId);
    const categories = await db.getCategories();
    res.render('updateItem', {
      title: 'Update product details',
      item: item[0],
      categories: categories,
    });
  },
  updateItemPost: async (req, res, next) => {
    const { itemId } = req.params;
    const { name, unit, category, price, quantity } = req.body;
    await db.updateItem(itemId, name, unit, category, price, quantity);
    res.redirect('/');
  },
  deleteItemGet: async (req, res, next) => {
    const { itemId } = req.params;
    const item = await db.getItemById(itemId);
    res.render('deleteItem', { title: 'Delete product', item: item[0] });
  },
  deleteItemPost: async (req, res, next) => {
    const { itemId } = req.params;
    await db.deleteItem(itemId);
    res.redirect('/');
  },
  addItemGet: async (req, res, next) => {
    res.render('addItem', { title: 'Add product' });
  },
  addItemPost: async (req, res, next) => {
    const { name, unit, category, price, quantity } = req.body;
    await db.addItem(name, unit, category, price, quantity);
    res.redirect('/');
  },
};
