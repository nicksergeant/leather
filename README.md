# Leather

A modern money management app written in [Elixir](https://elixir-lang.org/),
[Phoenix](http://www.phoenixframework.org/),
[React](https://facebook.github.io/react/), and [Redux](http://redux.js.org/).
Integrates with [Plaid](https://plaid.com/) for auto-importing of transactions
from thousands of banks and bank account types (checking, savings, investments,
etc.)

Follow [@leatherapp on Twitter](https://twitter.com/leatherapp) for updates.

![https://leatherapp.s3.amazonaws.com/breaking-cash.gif](https://leatherapp.s3.amazonaws.com/breaking-cash.gif)

### Run locally

1. `brew install elixir postgresql`
2. `brew services start postgresql`
3. `createuser leather --createdb`
4. `mix local.hex`
5. `mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez`
6. `git clone git@github.com:nicksergeant/leather.git`
7. `cd leather`
8. `mix ecto.create`
9. `mix phoenix.server`
10. Visit [http://localhost:4000/](http://localhost:4000/).

### Deploy to Heroku

1. `heroku create <app-name>`
2. `heroku buildpacks:set https://github.com/HashNuke/heroku-buildpack-elixir`
3. `heroku buildpacks:add https://github.com/gjaldon/heroku-buildpack-phoenix-static`
4. `heroku addons:create heroku-postgresql:hobby-dev`
5. `heroku config:set POOL_SIZE="18"`
6. `mix phoenix.gen.secret`
7. `heroku config:set SECRET_KEY_BASE="<generated-key-in-previous-step>"`
8. `heroku domains:add <your-domain>`
9. `heroku config:set HEROKU_DOMAIN="<your-domain>"`
10. `heroku config:set GZIP_ENABLED="true"`
