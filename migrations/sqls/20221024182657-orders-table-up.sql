/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY  KEY,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity INTEGER, 
    order_status VARCHAR NOT NULL);
