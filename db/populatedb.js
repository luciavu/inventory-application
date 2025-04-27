require('dotenv').config();
const { Client } = require('pg');

const deleteSQL = `

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS categories;
`;
const categorySQL = `
CREATE TABLE IF NOT EXISTS categories  (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) UNIQUE NOT NULL
);`;

const itemSQL = `
CREATE TABLE IF NOT EXISTS items  (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    unit VARCHAR (255),
    category_id INTEGER REFERENCES categories(id),
    quantity INTEGER DEFAULT 0,
    price FLOAT
);`;

const fillCategorySQL = `
INSERT INTO categories (id, name) VALUES 
    (1, 'Drinks'), (2, 'Food'), (3, 'Supplies');
`;

const fillItemsSQL = `
INSERT INTO items (name, unit, category_id, quantity, price) VALUES
    ('Coca-Cola Classic Soft Drink Cans', '375ml x 30 Pack', 1, 2, 50.00),
    ('Coca-Cola Zero Sugar Soft Drink Cans', '375ml x 30 Pack', 1, 2, 50.00),
    ('Fanta Orange Soft Drink Cans', '375ml x 24 Pack', 1, 1, 24.75),
    ('Red Bull Energy Drink Cans', '250ml x 8 Pack', 1, 1, 14.70),
    ('Mount Franklin Pure Spring Water', '600ml x 24 Pack', 1, 1, 29.9),
    ('Bundaberg Ginger Beer', '375ml x 24 Pack', 1, 3, 50.93),
    ('Bundaberg Lemon Lime Bitters', '375ml x 24 Pack', 1, 2, 50.93),
    ('Bundaberg Sarsaparilla', '375ml x 24 Pack', 1, 2, 50.93),
    ('Lipton Ice Tea Peach', '500ml x 12 Pack', 1, 2, 30.87),
    ('Lipton Ice Tea Lemon', '500ml x 12 Pack', 1, 2, 30.87),
    ('HIME Premium Short Grain Rice', '5kg', 2, 2, 21.50),
    ('AKAGI Joshu Udon', '270g', 2, 5, 2.6),
    ('MARUCHAN Yakisoba', '480g', 2, 5, 6.40),
    ('MB5+ Wagyu Scotch Fillet Steak', '400g', 2, 2, 54.40),
    ('Norway Salmon Fillet', '1.3kg', 2, 2, 72.40),
    ('KB''s Prawn Gyoza', '1kg', 2, 1, 26.40),
    ('KB''s Vegetable Gyoza', '1kg', 2, 1, 24.50),
    ('WP Shioyude Edamame', '454g', 2, 5, 3.5),
    ('TEP Okura Tempura', '500g', 2, 3, 12.40),
    ('Renkon Karaage', '500g', 2, 3, 15.90),
    ('NAGAI Aonoriko Bandoko Green Laver', '100g', 2, 2, 8.10),
    ('10cm Wooden Cutlery Spoon', '100pcs', 3, 2, 2.80),
    ('10cm Wooden Cutlery Fork', '100pcs', 3, 2, 2.80),
    ('Disposable Bamboo Chopsticks', '2000pcs', 3, 2, 58.00),
    ('BioPak Paper Straws', '100pcs', 3, 1, 4.90),
    ('Lunch Napkins 1/4 Fold', '3000pcs', 3, 1, 64.51),
    ('Takeaway Container (XS)', '800pcs', 3, 1, 165.00),
    ('Takeaway Container (M)', '400pcs', 3, 1, 88.00),
    ('Takeaway Container (L)', '400pcs', 3, 1, 112.00),
    ('BioPak Kraft Paper Bags (L)', '250pcs', 3, 1, 64.90);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  console.log('connected to DB');
  await client.query(deleteSQL);
  await client.query(categorySQL);
  await client.query(itemSQL);
  console.log('created tables...');
  await client.query(fillCategorySQL);
  await client.query(fillItemsSQL);
  console.log('filled tables...');
  await client.end();
  console.log('done');
}

main();
