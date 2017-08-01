deploy:
	git push heroku master

run:
	mix phx.server

.PHONY: deploy run
