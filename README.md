# Bam-book — Backend

Bam-book (working name) is a web app that connects readers with their local bookshop. Readers search for books, keep their reading lists and order a book from the bookshop they choose. Bookshops manage their catalogue and follow the orders from a back office.

This is the backend API of Bam-book, the final project (TFF) of the Full Stack JavaScript program at Bruxelles Formation. The frontend lives in a separate repository.

## Tech stack

* Node.js with Express 5
* Sequelize and PostgreSQL
* JWT and Argon2
* Zod

## Project structure

* `routes`: endpoints
* `middlewares`: token, role and body checks
* `controllers`: request and response
* `services`: business logic and database queries
* `models`: Sequelize models
* `validators`: Zod schemas

## API overview

All routes start with `/api`. Protected routes need a token and check the role (client or bookshop).

* `/auth`: sign up, login, and the logged user profile
* `/books`: Google Books search and book details
* `/toread` and `/read`: the two lists of the logged client
* `/orders`: create orders, list them, change status and price
* `/bookshops`: list of bookshops, and the logged bookshop profile
* `/catalogue`: catalogue of the logged bookshop

## External API

* Google Books API

## Design decisions

* Layered backend: routes, middlewares, controllers, services and models each have one job.
* The login token is stored in an httpOnly cookie and only read on the server, by Server Actions on the frontend side.
* Roles are checked in the backend, and each role has its own area after the login.
* Books in lists, orders and the catalogue are identified by ISBN. The Google Books id is only used for the detail page.
* Google Books is limited to English. If it does not answer, the classic search shows two sample books so the demo keeps working.

## Limitations and future plans

* **Custom lists:** planned — two new tables, rename and delete, and a working "Add to a list" endpoint.
* **Change password:** planned — a dedicated endpoint.
* **Forgot password:** planned — recovery by email.
* **Messages:** planned — messages linked to an order.
* **Accounting:** planned — revenue, completed orders, monthly figures and report export.
* **Orders:** currently one book per order. Planned: several books in the same order.
* **Robustness:** planned — unique constraints on the list tables and automated tests.

## Author

Pietro Carlini
