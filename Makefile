include dev.env
-include dev-local.env
export

DOCKER_COMPOSE := docker-compose -f docker-compose.yml $(DOCKER_COMPOSE_ADDITIONAL_FLAGS)

# -------------------------------------
# setup targets
# -------------------------------------
.PHONY: deps
deps:
	yarn --force

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
	$(DOCKER_COMPOSE) up -d

# -------------------------------------
# build targets
# -------------------------------------
.PHONY: build-ui
build-ui:
	cd ./src/packages/ui && npm run build

.PHONY: build-client
build-client:
	cd ./src/packages/client && npm run build
