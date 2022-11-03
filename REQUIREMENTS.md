# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/api/product/all' [GET]
- Show '/api/product/product' [GET] (provide id in the body. ex:{id="2"})
- Create '/api/product/create' [POST](provide json in the body. ex:{"product_name": "watch","price": "300"} )

#### Users
- Index '/api/users/all' [GET]
- Show (args: id) '/api/users/user' [GET] (provide id in the body. ex:{id="2"})
- Create (args: User)'/api/users/create' [POST] (provide json in the body. ex:{"firstName"="fn","lasttName"="ln","user_passwrod"="pass"}) 
- authenticate '/api/users/authenticate' [POST] (you need to copy the token and then add it in auth/bearer, provide id and username in the body)
(first create a user using SQL CLI then try the authenticate endpoint, it will provide you with the token to access the rest of the endpoints)
(token example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjoyOCwiZmlyc3RuYW1lIjoicmVlbWEiLCJsYXN0bmFtZSI6ImhhbWVkIiwidXNlcl9wYXNzd29yZCI6IiQyYiQxMCRWNTZIc0s1R05IM2MvN09MT2VkSUR1WlhkbFFhaWRvMzJHRTVmTzZFTDBvRWd5MlFmYTR2eSJ9LCJpYXQiOjE2NjczMDE4ODJ9.NeJ9KQUtO-u_Lu56oxT7J58jNnq_60xjm8G6HavbD_E)
#### Orders
- Current Order by user (args: user id) '/api/order/orders' [GET] (provide id in the body. ex:{"userID":"28"} )

## Data Shapes
#### product (Table name)
-  id (SERIAL PRIMARY  KEY)
- name (VARCHAR)
- price (integer)

#### users (Table name)
- id (SERIAL PRIMARY  KEY)
- firstName (VARCHAR)
- lastName (VARCHAR)
- password (VARCHAR NOT NULL)

#### orders (Table name)
- id (SERIAL PRIMARY  KEY)
- id of each product in the order (INTEGER REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE)
- quantity of each product in the order (INTEGER)
- user_id ( INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE)
- status of order (active or complete) (VARCHAR NOT NULL)

