const { Router } = require('express');
const categoryRouter = Router();
const controller = require('../controllers/categoryController');

categoryRouter.get('/add', controller.addCategoryGet);
categoryRouter.post('/add', controller.addCategoryPost);

module.exports = categoryRouter;
