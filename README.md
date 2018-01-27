# Catena GraphQL

This is a simple GraphQL wrapper around [Catena's REST API](https://api.explorecatena.com).

## Motivation

Nothing special. I just saw [this Canadian news article](https://globalnews.ca/news/3977745/ethereum-blockchain-canada-nrc/) and thought:

> Oh look, a new public API to wrap in cushy GraphQL! Well, I guess I know what to do while watching TV tonight!

## Tech stack used

* [koa](https://github.com/koajs/koa/blob/master/docs/koa-vs-express.md) w/ [koa-router](https://github.com/alexmingoia/koa-router) as a basic web server
* [apollo-server](https://github.com/apollographql/apollo-server) (in its Koa variant) to stand up the `/graphql` end point
* Apollo's [graphql-tools](https://www.npmjs.com/package/graphql-tools) to write the schema and resolvers
* [flow](https://flow.org/)... just for fun.
* [axios](https://www.npmjs.com/package/axios) to make the REST calls to the Catena API.
* [babel's env preset](https://babeljs.io/docs/plugins/preset-env), because nothing else matters.

## Usage

1. Clone this repo
2. `yarn` to install the dependencies
3. `yarn dev` to run the server with hot reloading (via [nodemon](https://github.com/remy/nodemon))
4. `yarn start` to transpile and run the server Production-style

## Todo

* [x] Write some tests, you savage!
* [ ] Expose Catena's pagination results
* [ ] Convert timestamps into ISO (Catena doesn't currently provide timezones, but is probably... Ontario-based?)
* [ ] Add a Dockerfile
* [ ] Enrich result with data from [Etherscan](https://etherscan.io/apis)
* [ ] Support Catena's localization (changes the response format)
* [ ] See if `organization` and `recipient` can also be enriched from somewhere (e.g. address lookup).
