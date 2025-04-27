const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const indexRouter = require('./routes/indexRouter');
const itemRouter = require('./routes/itemRouter');
const categoryRouter = require('./routes/categoryRouter');
const db = require('./db/queries');
const CustomNotFoundError = require('./errors/CustomNotFoundError');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(async (req, res, next) => {
  try {
    const categories = await db.getCategories();
    res.locals.categories = categories;
    next();
  } catch (err) {
    next(err);
  }
});

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Routes
app.use('/', indexRouter);
app.use('/item', itemRouter);
app.use('/category', categoryRouter);

app.use((req, res, next) => {
  throw new CustomNotFoundError('Page not found.');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
