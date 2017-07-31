deploy:
	git push heroku master

run:
	mix phoenix.server

.PHONY: deploy run
