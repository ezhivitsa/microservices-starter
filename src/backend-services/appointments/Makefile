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
	MONGO_PASSWORD=${MONGO_PASSWORD_LOCAL} \

DEV_VARS := NODE_ENV=development
AUTOTEST_VARS := NODE_ENV=test OVERRIDE_ENV=testing

DOCKER_COMPOSE := docker-compose -f docker-compose.yaml $(DOCKER_COMPOSE_ADDITIONAL_FLAGS)
DOCKER_COMPOSE_AUTOTEST := ${POSTGRES_AUTOTEST_VARS} ${DOCKER_COMPOSE}

# -------------------------------------
# dev targets
# -------------------------------------
.PHONY: dev
dev:
	${POSTGRES_DEV_VARS} npx nodemon \
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
test-docker: create-db-test migrate-test run-test

.PHONY: run-test
run-test: run-test-integration

.PHONY: run-test-integration
run-test-integration:
	${AUTOTEST_VARS} ${POSTGRES_AUTOTEST_VARS} \
	npx jest \
		--config=jest-integration.config.json \
		--passWithNoTests \
		--maxConcurrency=1 \
		--runInBand \
		--forceExit $(JEST_ADDITIONAL_FLAGS)

# -------------------------------------
# db targets
# -------------------------------------
.PHONY: migrate
migrate:
	$(DB_VARS) npx sequelize-cli db:migrate

.PHONY: create-db
create-db:
	$(DB_VARS) npx sequelize-cli db:create

.PHONY: migrate-local
migrate-local: build
migrate-local: DB_VARS=${MONGO_DEV_VARS} ${DEV_VARS}
migrate-local: migrate

.PHONY: migrate-test
migrate-test: build
migrate-test: DB_VARS=${MONGO_AUTOTEST_VARS} ${AUTOTEST_VARS}
migrate-test: migrate

.PHONE: create-db-local
create-db-local: build
create-db-local: DB_VARS=${MONGO_DEV_VARS} ${DEV_VARS}
create-db-local: create-db

.PHONE: create-db-test
create-db-test: build
create-db-test: DB_VARS=${MONGO_AUTOTEST_VARS} ${AUTOTEST_VARS}
create-db-test: create-db

# -------------------------------------
# release targets
# -------------------------------------
.PHONY: build
build:
	npx tsc -p ./tsconfig.production.json