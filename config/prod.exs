use Mix.Config

config :leather,
       LeatherWeb.Endpoint,
       cache_static_manifest: "priv/static/cache_manifest.json",
        force_ssl: [rewrite_on: [:x_forwarded_proto]],
        load_from_system_env: true,
        secret_key_base: Map.fetch!(System.get_env, "SECRET_KEY_BASE"),
        url: [scheme: "https",
         host: System.get_env("HEROKU_DOMAIN") || "example.com",
         port: 443]
config :logger, level: :info
config :leather,
       Leather.Repo,
       adapter: Ecto.Adapters.Postgres,
        url: System.get_env("DATABASE_URL"),
        pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
        ssl: true
