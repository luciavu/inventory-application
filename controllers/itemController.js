const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError.js');
const { body, validationResult } = require('express-validator');

const lengthErr = 'must be between 3 and 35 characters.';

const validateItem = [
  body('name').trim().isLength({ min: 3, max: 35 }).withMessage(`Product name ${lengthErr}`),
];

module.exports = {
  updateItemGet: async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const item = await db.getItemById(itemId);
      const categories = await db.getCategories();
      res.render('updateItem', {
        title: 'Update product details',
        item: item[0],
        categories: categories,
      });
    } catch (err) {
      next(err);
    }
  },
  updateItemPost: [
    ...validateItem,
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const { itemId } = req.params;
          const item = await db.getItemById(itemId);
          const categories = await db.getCategories();
          return res.status(400).render('updateItem', {
            title: 'Update product details',
            item: item[0],
            categories: categories,
            errors: errors.array(),
          });
        }
        const { itemId } = req.params;
        const { name, unit, category, price, quantity } = req.body;
        await db.updateItem(itemId, name, unit, category, price, quantity);
        res.redirect('/');
      } catch (err) {
        next(err);
      }
    },
  ],
  deleteItemGet: async (req, res, next) => {
    const { itemId } = req.params;
    const item = await db.getItemById(itemId);
    res.render('deleteItem', { title: 'Delete product', item: item[0] });
  },
  deleteItemPost: async (req, res, next) => {
    try {
      const { itemId } = req.params;
      await db.deleteItem(itemId);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
  addItemGet: async (req, res, next) => {
    res.render('addItem', { title: 'Add product' });
  },
  addItemPost: [
    ...validateItem,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('addItem', { title: 'Add product', errors: errors.array() });
      }
      const { name, unit, category, price, quantity } = req.body;
      await db.addItem(name, unit, category, price, quantity);
      res.redirect('/');
    },
  ],
};
