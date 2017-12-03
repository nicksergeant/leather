use Mix.Config

config :leather, LeatherWeb.Endpoint, http: [port: 4001], server: false
config :logger, level: :warn

config :leather, Leather.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "leather",
  password: "",
  database: "leather_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
