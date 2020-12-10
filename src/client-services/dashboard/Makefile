include dev.env
-include dev-local.env
export

GIT_CHECK_STAGED := $(shell git diff --name-only --cached)

# -------------------------------------
# dev targets
# -------------------------------------
.PHONY: dev
dev:
	LOCAL=1 \
	npx webpack-dev-server

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

.PHONY: compile-dry
compile-dry-client:
	npx tsc -p tsconfig.json --noEmit

.PHONY: test
test:
	npx jest --config=jest.client.config.json --passWithNoTests

.PHONY: validate
validate: lint compile-dry test

# -------------------------------------
# release targets
# -------------------------------------
.PHONY: build
build:
	NODE_ENV=production npx webpack
