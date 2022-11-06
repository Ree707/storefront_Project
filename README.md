-----------------------------------------Database------------------------------------------
first I created 2 databases one for testing and the other for dev 
used psql -U postgres to open postgress CLI
then i run these commands: 
1- CREATE USER shopping_user WITH PASSWORD 'YOURPASSWORD';
2- CREATE DATABASE shopping;
3- \connect shopping shopping_user localhost;
4- GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
5- CREATE DATABASE shopping_test;
6- \connect shopping_test shopping_user localhost;
7- GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;

Database port: 5432

Create database.json file with the following: 
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "shopping",
    "user": "shopping_user",
    "password": "YOURPASSWORD"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "shopping_test",
    "user": "test_user",
    "password": "YOURPASSWORD"
  }
}
-----------------------------------------Enviromental varibales------------------------------------------
create .env file and add the following: 
*this file is added to .gitgnore
POSTGRES_HOST =127.0.0.1
POSTGRES_DB =shopping
POSTGRES_TEST_DB=shopping_Test
POSTGRES_USER =shopping_user
POSTGRES_PASSWORD =YOURPASSWORD
BCRYPT_PASSWORD=YOURPASSWORD 
SALT_ROUNDS=10
PEPPER= YOURPASSWORD
TOKEN_SECRET=YOURPASSWORD
ENV= dev
-----------------------------------------Installing dependencies------------------------------------------
1- npm install
-----------------------------------------scripts------------------------------------------
to run the server: yarn watch 
(server runs on port localhost:3000)
to build: yarn build 
to test: yarn test

