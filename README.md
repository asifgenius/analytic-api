# Ecommerce api with express

## Features
- Calculate total sales over time 
- Calculate sales growth rate over time 
- Calculate new customers added over time
- Calculate number of repeat customers
- Calculate geographical distribution of customers
- Calculate customer lifetime value by cohorts

## Tech
- Express JS
- React JS
- Mongo DB

## Installation
### Node Server 
Install the dependencies and devDependencies.
```sh
$ npm i
```
Run the Server Project.
```sh
$ npm start
```
Verify the deployment to your server address in your browser.
```sh
$ 127.0.0.1:5000
```
### React App
Install the dependencies and devDependencies.
```sh
$ npm i
```
Run the Frontend Project.
```sh
$ npm start
```
Verify the deployment to your server address in your browser.
```sh
$ 127.0.0.1:3000
```
## Endpoints
```http
GET /api/v1/customers/analytics/new-customers-over-time?interval=monthly
GET /api/v1/customers/analytics/geographical
GET /api/v1/orders/analytics/growth?interval=daily
GET /api/v1/orders/analytics/sales?interval=daily
GET /api/v1/orders/analytics/repeat-customers?interval=daily
GET /api/v1/orders/analytics/life-time
```
## Status Code
| Status Code | Description |
| ------ | ------ |
| 200  | OK |
| 201 | CREATE |
| 400 | BAD REQUEST |
| 404 | NOT FOUND |
| 500 | INTERNAL SERVER ERROR |
