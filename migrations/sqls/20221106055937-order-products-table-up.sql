/* Replace with your SQL commands */
CREATE TABLE order_products(
  id serial primary key,
  product_id INTEGER REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
  quantity integer
); 