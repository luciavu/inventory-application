const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError.js');
const { body, validationResult } = require('express-validator');
const lengthErr = 'must be between 3 and 35 characters.';
const validateCategory = [
  body('cname').trim().isLength({ min: 3, max: 35 }).withMessage(`Category name ${lengthErr}`),
];

module.exports = {
  addCategoryGet: async (req, res, next) => {
    res.render('addCategory', { title: 'Add category' });
  },
  addCategoryPost: [
    ...validateCategory,
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).render('addCategory', {
            title: 'Add category',
            errors: errors.array(),
          });
        }
        const { adminPassword } = req.body;
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
          return res.render('addCategory', {
            title: 'Add category',
            errors: [{ msg: 'Incorrect admin password.' }],
          });
        }
        const { cname } = req.body;
        await db.addCategory(cname);
        res.redirect('/');
      } catch (err) {
        // Unique constraint violation
        if (err.code === '23505') {
          return res.status(400).render('addCategory', {
            title: 'Add category',
            errors: [{ msg: 'Category already exists.' }],
          });
        }
        next(err);
      }
    },
  ],
};
