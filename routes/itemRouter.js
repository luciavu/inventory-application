const { Router } = require('express');
const itemRouter = Router();
const controller = require('../controllers/itemController');

itemRouter.get('/update/:itemId', controller.updateItemGet);
itemRouter.post('/update/:itemId', controller.updateItemPost);
itemRouter.get('/delete/:itemId', controller.deleteItemGet);
itemRouter.post('/delete/:itemId', controller.deleteItemPost);
itemRouter.get('/add', controller.addItemGet);
itemRouter.post('/add', controller.addItemPost);

module.exports = itemRouter;
