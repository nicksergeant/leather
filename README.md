# Leather

A modern money management app written in Elixir, Phoenix, React, and Redux. 💰

Follow [@leatherapp on Twitter](https://twitter.com/leatherapp) for updates.

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
