# Book Managment Service

## Description

Example how we can create small REST API service

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tools

### Postman

Postman collection can be found in `postman` folder. Postman is used in order to make development easier. Collection can be exported easily in a single file.

### Swagger

Swagger is standard for documenting REST API. It has nice integration with Nest.js. Code because of Swagger documentation get full of annotation, but for small projects that should not be a problem. In case annotations for Swagger are not desired, we could supply json file with REST API description.

### MongoDB

MongoDB is NoSQL database. It use JSON like documents. It is very easy to use from JavaScript. It has support for full-text search. So in case we want to search document, that could be easily done. In this case we have denormalized ducments so that they authors are not separate object but just a string. That way we could get search implemented faster and easier.

### Nest.js

Nest.js is Node.js framework with out of box support for Typescript. It combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming). Under the hood it is using Express.js. It is very extensible and there is bunch of modules that can solve very common issues.
