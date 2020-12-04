include dev.env
-include dev-local.env
export

GIT_CHECK_STAGED := $(shell git diff --name-only --cached)

# -------------------------------------
# dev targets
# -------------------------------------
.PHONY: dev
dev:
	npx nodemon \
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
# release targets
# -------------------------------------
.PHONY: build
build:
	npx tsc -p ./tsconfig.server.production.json
