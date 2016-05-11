#Sails Webpack Typescript Angular2 Mysql Exercise

* Frontend: http://frontend.exercise.farandal.com/
* API: http://backend.exercise.farandal.com/products

##Database Architecture

1.     The system will store many Products, from many Brands.
2.     Each Product belongs to a Brand. Each Brand can have many Products.
3.     Products need to have an ID, Product Name, Description, Price, Colour, Date Created and Availability Status (e.g. In Stock, Out of Stock, Archived).
4.     A Brand needs to have an ID, Name and Description.
5.     A Product can have Reviews. Each Review is written by a User.
6.     A Review needs to have an ID, Rating, Comment. The rating can only be a number between 0 to 10. 
7.     A User needs to have an ID, User Type, User Name, Email and Date of Birth. Email should be unique (i.e. two users can't have the same email). User Types will be Customer and Merchant

![alt tag](https://github.com/farandal/sails-angular2-exercise/blob/master/docs/exercise_er.png)

##REST API User Cases

### As any user, I want to call a web service to find the latest Products, so I can display them. 

* Acceptance Criteria:

1.     Returns the 10 newest products. 
2.     For each product, needs to include the Product ID, Name, Description, Brand Name and the most recent Review for this product (including the User Name and Review Summary). 
3.     Accepts an optional Brand ID parameter to filter the results. If a Brand ID provided, returns only products for that brand. 

* Technical acceptance criteria:

1.     RESTful web service that uses JSON as message format
2.     No authentication required
3.     Uses a Stored Procedure (not an ORM) to query the database


### As a Customer, I want to call a web service to Create a Review, so I can give feedback on a product. 

* Acceptance Criteria:

1.     Accepts parameters for User ID, Product ID, Rating, Comment 
2.     User ID must exist, and must be for a user with type "Customer" 
3.     Should perform basic validation and return a descriptive error message if validation fails

* Technical acceptance criteria:

1.     RESTful web service that uses JSON as message format 
2.     No authentication required 


##FRONTEND User Cases

## As a Customer, I want to view the latest Products on the website, so I can choose what to buy. 

* Acceptance Criteria:

1.     The page accepts an optional Brand ID parameter on the URL to filter the results. If a Brand ID provided, displays only products for that brand. If no Brand ID, then show products from any Brand.
2.     If no products found, displays a friendly message to the user.
3.     If matching products are found, the page will display a list of the (up to) 10 newest products, including their Product Name & Description, Brand Name and the most recent review (including the User Name, Rating and Comment).
4.     Each product in the list should have an "Add Review" link that will take the user to a different page where they can add a Review (this page to be created in the next step). 
5.     The page should use at least some basic visual styling, but it's up to you how far you want to take this (depending on your front-end development skills etc).\n
Technical acceptance criteria:
1.     Needs to call the Find Products web service you previously created
2.     Needs to work in current versions of Chrome and Firefox
3.     No authentication required

##As a Customer, I want to add a new Review via the website, so I can give feedback on a product. 

* Acceptance criteria:

1.     The page accepts a Product ID on the URL. This product must exist.
2.     If no matching product found, then show a descriptive message to the user. 
3.     If the product does exist, then show the Product Name on the form (read only).
4.     The user can use a form to enter their Email, Rating and Comment. They can then click a "Save" button to submit their review.
5.     If the review fails validation, the user should see a descriptive message on the page.
6.     If the save is successful, the user should be redirected back to the View Product List page 
7.     The page should have some basic visual styling.

* Technical acceptance criteria:

1.     Needs to call the Add Review web service you previously created 
2.     Needs to work in current versions of Chrome and Firefox 
3.     No authentication required 

##Solution Overview:

The project is divided in 2 apps. 
The API, is a Sails.js application that returns the queries in json formal. 
The FRONTEND, is an Angular2 application, that display the products data.

How to install in localhost

## Enviorement requirements

* mysql
* node
* npm

## Isntall dependencies

npm install sails -g
npm install webpack -g

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

* GET /products
* GET  /products/brand/:brandId - Get products by Brand Id
* GET  /products/:productId - Product Detail 
* GET  /products/:productId/reviews - Get all product reviews
* POST /products/:productId/reviews - Post a review


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

## REST API Tests

Run basic tests with Mocha

```
npm test
```



