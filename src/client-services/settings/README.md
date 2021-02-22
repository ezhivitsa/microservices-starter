# Settings client service

Microfrontend service for updating user settings and user information.
This service doesn't require server, built files should be loaded to storage (like s3).

This service uses [single-spa-react](https://github.com/single-spa/single-spa-react) to create service compatible with [single-spa](https://single-spa.js.org/).

## Commands

Start development server:
```shell
$ make dev
```

Build static:
```shell
$ make build
```

Validate service
```shell
$ make validate
```