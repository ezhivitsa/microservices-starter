include dev.env
-include dev-local.env
export

POSTGRES_DEV_VARS := POSTGRES_PORT=${POSTGRES_PORT_DEV} \
	POSTGRES_HOST=${POSTGRES_HOST_LOCAL} \
	POSTGRES_DATABASE=${POSTGRES_DB_DEV} \
	POSTGRES_USER=${POSTGRES_USER_DEV} \
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD_LOCAL}

DOCKER_COMPOSE := docker-compose -f docker-compose.yml $(DOCKER_COMPOSE_ADDITIONAL_FLAGS)
DOCKER_COMPOSE_DEV := ${POSTGRES_DEV_VARS} ${DOCKER_COMPOSE}

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

.PHONY: lint
lint:
	yarn workspaces foreach -vp run lint

# -------------------------------------
# build targets
# -------------------------------------
.PHONY: build-ui
build-ui:
	cd ./src/packages/ui && npm run build

.PHONY: build-client
build-client:
	cd ./src/packages/client && npm run build
