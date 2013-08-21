test: jshint
	@./node_modules/.bin/mocha -R spec

test-server:
	node test/app.test.js

jshint:
	@./node_modules/.bin/jshint Gruntfile.js index.js test/*.js example/**/*.js

.PHONY: jshint test
