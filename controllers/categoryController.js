const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError.js');

module.exports = {
  addCategoryGet: async (req, res, next) => {
    res.render('addCategory', { title: 'Add category' });
  },
  addCategoryPost: async (req, res, next) => {
    const { cname } = req.body;
    await db.addCategory(cname);
    res.redirect('/');
  },
};
