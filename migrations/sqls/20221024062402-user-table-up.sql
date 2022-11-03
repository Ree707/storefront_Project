CREATE TABLE users(
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR,
    lastName VARCHAR,  
    user_password VARCHAR NOT NULL);
