# Blog-backend-demo

## Description
This project is to create a simple blog backend. It's feature includes post, comments, users, and user authentication.

This project is build using Nestjs and Nodejs, uses MySQL for database, TypeORM, JWT for user authentication

## Installation

1. ```bash
$ npm install
```

2. create a local database in MySQL. (can refer to .env for a simple setup) and run the server

3. in app.module.ts, turn on synchronize for backend to synchronize all tables in your local database (This step is use as migration is not reliable yet)

4. Install Postman and import the API collection in the 'postman' folder into Postman app.


## Running the app

```bash
# development
$ npm run start
```

## Steps to test APIs in Postman
1. Open your prefered database viewer (MySQL workbench / dBeaver) to view the data
2. First create a user using 'create user' api in User folder.
3. Use the 'login' api in Auth folder and input the same email and password used in previous step. This Postman API will save the auth token into a bearer token for other API authentications
4. Now you should be able to access all other APIs.
5. Create a post and take note of it's id in your db viewer.
6. Create a comment and change the post_id to the post's id that you have just created to create a comment under the post.



Ref(migration)
https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75