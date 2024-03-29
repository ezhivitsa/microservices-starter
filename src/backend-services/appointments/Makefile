include dev.env
-include dev-local.env
export

MONGO_DEV_VARS := MONGO_PORT=${MONGO_PORT_DEV} \
	MONGO_HOST=${MONGO_HOST_LOCAL} \
	MONGO_DATABASE=${MONGO_DB_DEV} \
	MONGO_USER=${MONGO_USER_DEV} \
	MONGO_PASSWORD=${MONGO_PASSWORD_LOCAL}

MONGO_AUTOTEST_VARS := MONGO_PORT=${MONGO_PORT_AUTOTEST} \
	MONGO_HOST=${MONGO_HOST_LOCAL} \
	MONGO_DATABASE=${MONGO_DB_AUTOTEST} \
	MONGO_USER=${MONGO_USER_AUTOTEST} \
	MONGO_PASSWORD=${MONGO_PASSWORD_LOCAL}

DEV_VARS := ${MONGO_DEV_VARS} NODE_ENV=development
AUTOTEST_VARS := ${MONGO_AUTOTEST_VARS} NODE_ENV=test OVERRIDE_ENV=testing

DOCKER_COMPOSE := docker-compose -f docker-compose.yaml $(DOCKER_COMPOSE_ADDITIONAL_FLAGS)
DOCKER_COMPOSE_AUTOTEST := ${AUTOTEST_VARS} ${DOCKER_COMPOSE}

# -------------------------------------
# dev targets
# -------------------------------------
.PHONY: dev
dev:
	${DEV_VARS} npx nodemon \
		--config ./nodemon.json \
		--legacy-watch \
		-- \
			--inspect=$(NODE_INSPECTOR_HOST):$(NODE_INSPECTOR_PORT) \
			--require ts-node/register \
		-- src/app/boot.ts

# -------------------------------------
# validation targets
# -------------------------------------
.PHONY: lint-code
lint-code:
	$(if $(NO_CACHE), rm -f .eslintcache;) \
	npx eslint \
		--cache \
		--report-unused-disable-directives \
		$(if $(FIX),--fix) \
		"$(PWD)/**/*.{ts,tsx}"

.PHONY: lint
lint: lint-code

.PHONY: compile-dry
compile-dry:
	npx tsc -p tsconfig.json --noEmit

.PHONY: validate
validate: lint compile-dry test-docker

.PHONY: db-test-start
db-test-start:
	$(DOCKER_COMPOSE_AUTOTEST) up -d --no-recreate

.PHONY: db-test-stop
db-test-stop:
	$(DOCKER_COMPOSE_AUTOTEST) rm -v -s -f

.PHONY: test-docker
test-docker: db-test-stop
test-docker: db-test-start
test-docker: run-test

.PHONY: run-test
run-test: run-test-integration

.PHONY: run-test-integration
run-test-integration:
	${AUTOTEST_VARS} \
	npx jest \
		--config=jest-integration.config.json \
		--passWithNoTests \
		--maxConcurrency=1 \
		--detectOpenHandles \
		--runInBand $(JEST_ADDITIONAL_FLAGS)

# -------------------------------------
# release targets
# -------------------------------------
.PHONY: build
build:
	npx tsc -p ./tsconfig.production.json
