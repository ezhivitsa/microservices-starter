include dev.env
-include dev-local.env
export

MAILGUN_DEV_VARS := MAILGUN_API_KEY=${MAILGUN_API_KEY_DEV}

DEV_VARS := NODE_ENV=development

# -------------------------------------
# dev targets
# -------------------------------------
.PHONY: dev
dev:
	${MAILGUN_DEV_VARS} ${DEV_VARS} npx nodemon \
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

.PHONY: validate
validate: lint compile-dry

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
