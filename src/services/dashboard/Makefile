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
		-- src/server/boot.ts

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

.PHONY: lint-style
lint-style:
	$(if $(NO_CACHE), rm -f .stylelintcache;) \
	npx stylelint --cache "$(PWD)/src/client/**/*.pcss"

.PHONY: lint
lint: lint-code lint-style

.PHONY: compile-dry-client
compile-dry-client:
	npx tsc -p src/client/tsconfig.json --noEmit

.PHONY: compile-dry-server
compile-dry-server:
	npx tsc -p src/server/tsconfig.json --noEmit

.PHONY: compile-dry
compile-dry: compile-dry-client compile-dry-server

.PHONY: test-common
test-common:
	npx jest --config=jest.common.config.json --passWithNoTests

.PHONY: test-client
test-client:
	npx jest --config=jest.client.config.json --passWithNoTests

.PHONY: test-server
test-server:
	npx jest --config=jest.server.config.json --passWithNoTests

.PHONY: test
test: test-common test-client test-server

.PHONY: validate
validate: lint compile-dry test

# -------------------------------------
# release targets
# -------------------------------------
.PHONY: build
build: clean build-server build-client

.PHONY: build-server
build-server:
	npx tsc -p tsconfig.server.production.json

.PHONY: build-client
build-client:
	NODE_ENV=production npx webpack
