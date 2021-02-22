# Main client service

Service for managing other microfrontend services. We use [single-spa](https://single-spa.js.org/) to build system of loading required services when open appropriate page.

Also in main service we set up general layout for pages. We have 2 types of layouts:

1. Default layout. Have been used for pages where user is authorized and can do some actions inside the system. This layout includes application menus and information about current user.
2. Empty layout. Is used on pages where user is not authorized and can't interact with system itself.

This service required server for generating html code with config.

We use [systemjs](https://github.com/systemjs/systemjs) to create configuration for loading `js` and `css` files for appropriate page. Also we use [construct-stylesheets](https://github.com/WICG/construct-stylesheets/blob/gh-pages/explainer.md) to set css classes for the page.

## Commands

Start development server:
```shell
$ make dev
```

Build files (static files for client and `js` files for server):
```shell
$ make build
```

Validate service (server and client)
```shell
$ make validate
```
