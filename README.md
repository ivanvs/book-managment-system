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

Postman collection can be found in `postman` folder. Postman is used in order to make development easier. A collection of API Endpoint invocations can be exported easily in a single file, and that export can be found in the folder.

### Swagger

Swagger is the de facto standard for documenting REST API. It can be easily integrated with Nest.js. Because of Swagger documentation, the code can get clogged with annotations, but such a small project like this one that should not be a problem. In the case when annotations for Swagger are not desired, we could supply a json file with the REST API description.

### MongoDB

MongoDB is a NoSQL database. It stores data in JSON-like documents and is very easy to use from JavaScript code. It has support for full-text search, so in case we want to search documents, that could be easily done. In this case we have denormalized ducments so that they authors are not separate object but just a string. That way we could implement search faster and easier.

### Nest.js

Nest.js is Node.js framework with out-of-the-box support for Typescript. It combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming). Under the hood it is using Express.js. It is very extensible and there is a great number of modules that can solve common issues and make life for developer easier.
