# Microservices-starter

This project is example of building application using principles of [microservices](https://microservices.io/) and [microfrontend](https://micro-frontends.org/) architecture. Also we used monorepository technique to combine all codebase inside one git repository.

## Structure

In [src](./src) directory contains 3 directories for 3 different purposes:
1. **[src/backend-services](./src/backend-services)** - directory consist of services which built upon microservices approach.
2. **[src/client-services](./src/client-services)** - directory with services to handle microfrontends architecture (built using [single-spa](https://single-spa.js.org/))
3. **[src/packages](./src/packages)** - directory with common use packages which can be used in backend services or client services or both

## Monorepository

For this project we have used monorepository approach. This has been implemented using yarn 2 [workspaces](https://yarnpkg.com/features/workspaces). Therefore now we are able to use our custom packages from the directory [src/packages](./src/packages) like ordinary npm packages.

## Commands

To write commands like installing npm dependencies we use `make` to write appropriate scripts. For example, to install npm dependencies for all workspaces to have to use command `make deps` in the root of the repository, or to build all packages from the directory [src/packages](./src/packages) you have to use command `make build`. Full list of available commands you can find in the [Makefile](./Makefile).

## ToDo list:
1) add event sourcing to one backend service
2) add user information to kafka message headers
3) add jest tests to packages/client
