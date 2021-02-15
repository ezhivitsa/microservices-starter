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
		"$(PWD)/src/**/*.{ts,tsx}"

.PHONY: run-test-unit
run-test-unit:
	npx jest --config=jest-unit.config.json --passWithNoTests
