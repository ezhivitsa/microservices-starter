include dev.env
-include dev-local.env
export

POSTGRES_VARS := POSTGRES_PORT=${POSTGRES_PORT} \
	POSTGRES_HOST=${POSTGRES_HOST_LOCAL} \
	POSTGRES_DATABASE=${POSTGRES_DATABASE} \
	POSTGRES_USER=${POSTGRES_USER} \
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

REDIS_VARS := REDIS_PASSWORD=${REDIS_PASSWORD} \
	REDIS_PORT=${REDIS_PORT}

MONGO_VARS := MONGO_USER=${MONGO_USER} \
	MONGO_PASSWORD=${MONGO_PASSWORD} \
	MONGO_PORT=${MONGO_PORT}

DOCKER_COMPOSE := docker-compose -f docker-compose.yml $(DOCKER_COMPOSE_ADDITIONAL_FLAGS)
DOCKER_COMPOSE_DEV := ${POSTGRES_VARS} ${REDIS_VARS} ${MONGO_VARS} ${DOCKER_COMPOSE}

# -------------------------------------
# setup targets
# -------------------------------------
.PHONY: deps
deps:
	yarn

# -------------------------------------
# dev targets
# -------------------------------------
.PHONY: run-zookeeper
run-zookeeper:
	$(DOCKER_COMPOSE) up -d --no-recreate zookeeper

.PHONY: run-kafka
run-kafka:
	$(DOCKER_COMPOSE) up -d --no-recreate kafka

.PHONY: run
run:
	$(DOCKER_COMPOSE_DEV) up -d

.PHONY: build
build:
	yarn workspaces foreach -tvp run build

# -------------------------------------
# validation targets
# -------------------------------------
.PHONY: lint
lint:
	yarn workspaces foreach -vp run lint

.PHONY: validate-api-gateway
validate-api-gateway:
	cd ./src/backend-services/api-gateway && make validate

.PHONY: validate-authorization
validate-authorization:
	cd ./src/backend-services/authorization && make lint compile-dry

.PHONY: validate-email
validate-email:
	cd ./src/backend-services/email && make lint compile-dry

.PHONY: validate-users
validate-users:
	cd ./src/backend-services/users && make lint compile-dry

.PHONY: validate-authorization-form
validate-authorization-form:
	cd ./src/client-services/authorization-form && make validate

.PHONY: validate-dashboard
validate-dashboard:
	cd ./src/client-services/dashboard && make validate

.PHONY: validate-main
validate-main:
	cd ./src/client-services/main && make validate

.PHONY: validate-settings
validate-settings:
	cd ./src/client-services/settings && make validate

# -------------------------------------
# build targets
# -------------------------------------
.PHONY: build-ui
build-ui:
	cd ./src/packages/ui && npm run build

.PHONY: build-client
build-client:
	cd ./src/packages/client && npm run build
