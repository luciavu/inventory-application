const pool = require('./pool');

async function getItems() {
  const { rows } = await pool.query(`SELECT * FROM items ORDER BY id`);
  return rows;
}

async function addCategory(name) {
  try {
    await pool.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);
  } catch (err) {
    console.error('Error adding category');
    throw err;
  }
}

async function getCategoryById(categoryId) {
  try {
    const { rows } = await pool.query(`SELECT name FROM categories WHERE id = $1`, [categoryId]);
    return rows;
  } catch (err) {
    console.error('Error finding category');
    throw err;
  }
}

async function getCategories() {
  const { rows } = await pool.query(`SELECT * FROM categories`);
  return rows;
}

async function getItemsByCategory(categoryId) {
  const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId]);
  return rows;
}

async function getItemById(itemId) {
  const { rows } = await pool.query(`SELECT * FROM items WHERE id = $1`, [itemId]);
  return rows;
}

async function addItem(name, unit, category_id, quantity, price) {
  try {
    await pool.query(
      `INSERT INTO items (name, unit, category_id, quantity, price) VALUES
    ($1, $2, $3, $4, $5)`,
      [name, unit, category_id, quantity, price]
    );
  } catch (err) {
    console.error('Error adding item');
    throw err;
  }
}

async function updateItem(itemId, name, unit, categoryId, price, quantity) {
  const { rows } = await pool.query(
    `UPDATE items SET name = $2, unit = $3, category_id = $4, price = $5, quantity= $6 WHERE id = $1 RETURNING *`,
    [itemId, name, unit, categoryId, price, quantity]
  );
  return rows;
}

async function deleteItem(itemId) {
  try {
    const result = await pool.query(`DELETE FROM items WHERE id = $1`, [itemId]);
    if (result.rowCount === 0) {
      console.log('No item found to delete with ID:', itemId);
    } else {
      console.log('Item deleted succesfully');
    }
  } catch (err) {
    console.error('Error deleting');
    throw err;
  }
}

module.exports = {
  getItems,
  getCategories,
  getCategoryById,
  addCategory,
  getItemsByCategory,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
