# Catena GraphQL

This is a simple GraphQL wrapper around [Catena's REST API](https://api.explorecatena.com).

## Motivation

Nothing special. I just saw [this Canadian news article](https://globalnews.ca/news/3977745/ethereum-blockchain-canada-nrc/) and thought:

> Oh look, a new public API to wrap in cushy GraphQL! Well, I guess I know what to do while watching TV tonight!

## Tech stack used

1. [Koa](https://github.com/koajs/koa/blob/master/docs/koa-vs-express.md) w/ [koa-router](https://github.com/alexmingoia/koa-router) as a basic web server
2. [apollo-server](https://github.com/apollographql/apollo-server) (in its Koa variant) to stand up the `/graphql` end point
3. Apollo's [graphql-tools](https://www.npmjs.com/package/graphql-tools) to write the schema and resolvers
4. [Flow](https://flow.org/)... just for fun.
5. [Axios](https://www.npmjs.com/package/axios) to make the REST calls to the Catena API.
