use Mix.Config

config :leather, LeatherWeb.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    node: [
      "node_modules/brunch/bin/brunch",
      "watch",
      "--stdin",
      {:cd, Path.expand("../assets", __DIR__)}
    ]
  ]

config :leather, LeatherWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r(priv/static/.*(js|css|png|jpeg|jpg|gif|svg\)$),
      ~r(priv/gettext/.*(po\)$),
      ~r(lib/leather_web/.*(ex\)$),
      ~r(lib/leather_web/.*(eex\)$)
    ]
  ]

config :logger, :console, format: "[$level] $message\n"
config :phoenix, :stacktrace_depth, 20

config :leather, Leather.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "leather",
  password: "",
  database: "leather_dev",
  hostname: "localhost",
  pool_size: 10
