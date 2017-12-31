# Leather

A modern money management app written in [Elixir](https://elixir-lang.org/),
[Phoenix](http://www.phoenixframework.org/),
[React](https://facebook.github.io/react/), and [Redux](http://redux.js.org/).
Integrates with [Plaid](https://plaid.com/) for auto-importing of transactions
from thousands of banks and bank account types (checking, savings, investments,
etc.)

Follow [@leatherapp on Twitter](https://twitter.com/leatherapp) for updates.

#### Screenshot:

<img src="https://leatherapp.s3.amazonaws.com/gh-screenshot.png" width=700 />

## Run locally

1. `brew install elixir postgresql`
2. `brew services start postgresql`
3. `createuser leather --createdb`
4. `git clone git@github.com:nicksergeant/leather.git`
5. `cd leather`
6. `mix ecto.create`
7. `mix phoenix.server`
8. Visit [http://localhost:4000/](http://localhost:4000/).

**With [Plaid](https://plaid.com/) integration:**

Create a `.env` file in the root of the project with the following contents:

```
export PLAID_CLIENT_ID=<plaid-client-id>
export PLAID_PUBLIC_KEY=<plaid-public-key>
export PLAID_SECRET=<plaid-secret>
```

Then run `source .env && mix phoenix.server`.

## Automatic deploy to Heroku

You can click the button below to automatically deploy Leather to Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/nicksergeant/leather)

#### Important!

If you intend to use this instance securely, you must set the `HOSTNAME` environment variable so that WebSocket connections are restricted to your domain:

`heroku config:set HOSTNAME="<your-domain>"`

## Manual deploy to Heroku

1. `heroku create <app-name>`
2. `heroku buildpacks:set https://github.com/HashNuke/heroku-buildpack-elixir`
3. `heroku buildpacks:add https://github.com/gjaldon/heroku-buildpack-phoenix-static`
4. `heroku addons:create heroku-postgresql:hobby-dev`
5. `heroku config:set POOL_SIZE="18"`
6. `mix phoenix.gen.secret`
7. `heroku config:set SECRET_KEY_BASE="<generated-key-in-previous-step>"`
8. `heroku domains:add <your-domain>`
9. `heroku config:set HOSTNAME="<your-domain>"`
10. `heroku config:set GZIP_ENABLED="true"`

## Integration with [Plaid](https://plaid.com/)

1. `heroku config:set PLAID_CLIENT_ID='<plaid-client-id>'`
2. `heroku config:set PLAID_PUBLIC_KEY='<plaid-public-key>'`
3. `heroku config:set PLAID_SECRET='<plaid-secret>'`
