const pool = require('./pool');

async function getAllItems() {
  const { rows } = await pool.query(`SELECT * FROM items`);
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query(`SELECT * FROM categories`);
  return rows;
}

async function getOrders() {
  const { rows } = await pool.query(`SELECT * FROM orders`);
  return rows;
}

async function getItemsByCategory(categoryId) {
  const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId]);
  return rows;
}

async function updateItem(itemId, order_quantity) {
  const { rows } = await pool.query(
    `UPDATE items SET on_order = on_order + $1 WHERE id = $2 RETURNING *`,
    [order_quantity, itemId]
  );
  return rows;
}

module.exports = { getAllItems, getCategories, getOrders, getItemsByCategory, updateItem };
