include dev.env
-include dev-local.env
export

POSTGRES_DEV_VARS := POSTGRES_PORT=${POSTGRES_PORT_DEV} \
	POSTGRES_HOST=${POSTGRES_HOST_LOCAL} \
	POSTGRES_DATABASE=${POSTGRES_DB_DEV} \
	POSTGRES_USER=${POSTGRES_USER_DEV} \
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD_LOCAL}

DEV_VARS := NODE_ENV=development

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
		-- src/boot.ts

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

.PHONY: run-test
run-test: run-test-unit

.PHONY: run-test-unit
run-test-unit:
	npx jest --config=jest-unit.config.json --passWithNoTests

.PHONY: validate
validate: lint compile-dry run-test

# -------------------------------------
# build targets
# -------------------------------------
.PHONY: build-emails
build-emails:
	npx mjml ./resources/emails/*.mjml -o ./resources/emails/html

# -------------------------------------
# release targets
# -------------------------------------
.PHONY: build
build:
	npx tsc -p ./tsconfig.production.json
