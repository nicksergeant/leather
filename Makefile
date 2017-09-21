deploy:
	git push heroku master
	heroku run mix ecto.migrate

run:
	mix phx.server

.PHONY: deploy run
