#Exercise

The project is divided in 2 apps. 
The API, is a Sails.js application that returns the queries in json formal. 
The FRONTEND, is an Angular2 application, that display the products data.

How to install in localhost

## Enviorement requirements

* mysql
* node
* npm

## Configure your mysql database

Use phpmyadmin or command line to import the mysqldump for testing:
https://github.com/farandal/excercise/blob/master/docs/exercise_test_dump.sql

```
git clone https://github.com/farandal/excercise
cd exercise/docs
mysql -uroot -pxxx exercise < exercise_test_dump.sql
```

## Install and Configure the API

```

#install global dependencies

sudo npm -g install sails
cd exercise/api
npm install 
cd ..

#open in sublime, nano or favorite editor, and modify the mysql credentials

subl api/config/connection.js

#start the service

sails lift

```

## Install and Configure the FRONTEND APP

```

#start the frontend app
#http://localhost:3000
cd exercise/frontend
npm install
npm start

```

# Sails.js + Mysql plain SQL queries SIMPLE REST API

## Enabled Endpoints:

* * GET /products
* * GET  /products/brand/:brandId - Get products by Brand Id
* * GET  /products/:productId - Product Detail 
* * GET  /products/:productId/reviews - Get all product reviews
* * POST /products/:productId/reviews - Post a review


Example GET /products output format

```json
[
{
"id": 1,
"name": "Watch",
"description": "The Apple Watch (marketed stylized as Apple logo black.svgWATCH) is a smartwatch developed by Apple Inc. It incorporates fitness tracking and health-oriented capabilities with integration with iOS and other Apple products and services.",
"brand": "apple",
"username": "Francisco",
"comment": "That original device was the first video game console offered by an American company after the Atari Jaguar stopped sales in 1996. It reached over 24 million units sold as of May 10, 2006.",
"rating": 8
},
{
"id": 2,
"name": "XBox",
"description": "Xbox is a video gaming brand created and owned by Microsoft. It represents a series of video game consoles developed by Microsoft, with three consoles released in the sixth, seventh, and eighth generations respectively.",
"brand": "Microsoft",
"username": null,
"comment": null,
"rating": null
}
]
```

## Common SQL Query for product listing. Get latest review from Review table. 

```
SELECT
  p1.id,
  p1.name,
  p1.description,
  Brand.name AS brand,
  latestreview.username,
  latestreview.comment,
  latestreview.rating
FROM
  Product AS p1
LEFT JOIN
  Brand
ON
  p1.idBrand = Brand.id
LEFT JOIN
  (
  SELECT
    p2.id AS pid,
    USER.name AS username,
    Review.comment,
    Review.rating
  FROM
    Review,
    Product AS p2
  LEFT JOIN
    USER
  ON
    p2.idUser = USER.id
  ORDER BY
    Review.createdAt
  DESC
LIMIT 0,
1
) AS latestreview
ON
  p1.id = latestreview.pid
```

## Common SQL Query for reviews

```
SELECT 
	Review.idProduct AS productId, 
	USER.name AS username, 
	Review.comment, 
	Review.rating 
FROM 
	Review 
LEFT JOIN USER
ON USER.id = Review.idUser 
WHERE 
Review.idProduct = ?
```

## Unit Testing




