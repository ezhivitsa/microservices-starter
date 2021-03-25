# Calendar client service

Microfrontend service to work with appointments.
Here we have implemented following functionality:

1. Show list of appointments fot time period
2. Create new appointment
3. Delete appointment

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