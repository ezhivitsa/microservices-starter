# Api gateway

Implementation of [api gateway](https://microservices.io/patterns/apigateway.html) pattern.

All external api requests go through this service. This allows us to hide microservices structure from the client.

## Validation

For validating requests we use [joi](https://github.com/sideway/joi). For this purposes we have special middleware [validate-middleware](./src/middlewares/validate-middleware). We can validate body, path and query parameters of the request.

## Oauth2

We use oauth2 for authorization. For this purposes we implemented oauth [model](./src/lib/oauth/model) for [grants](https://oauth.net/2/grant-types/) password and refresh_token. For this purposes we use package [oauth2-server](https://github.com/oauthjs/node-oauth2-server).
