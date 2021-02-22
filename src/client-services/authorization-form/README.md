# Authorization form client service

Microfrontend service to show authorization related pages.
Here we have the following list of pages:

1. Sign up page
2. Sign in page
3. Forgot password page
4. Reset password page
5. Resend verify email page

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