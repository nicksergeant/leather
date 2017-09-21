use Mix.Config

config :leather,
       LeatherWeb.Endpoint,
       cache_static_manifest: "priv/static/cache_manifest.json",
       check_origin: (if System.get_env("HOSTNAME"), do: ["https://" <> System.get_env("HOSTNAME")], else: false),
       force_ssl: [rewrite_on: [:x_forwarded_proto]],
       load_from_system_env: true,
       secret_key_base: Map.fetch!(System.get_env(), "SECRET_KEY_BASE"),
       url: [
         scheme: "https",
         host: System.get_env("HOSTNAME") || "example.com",
         port: 443,
       ]
config :logger, level: :info
config :leather,
       Leather.Repo,
       adapter: Ecto.Adapters.Postgres,
       url: System.get_env("DATABASE_URL"),
       pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
       ssl: true
config :sentry,
       dsn: System.get_env("SENTRY_DSN") || "",
       environment_name: :prod,
       enable_source_code_context: true,
       root_source_code_path: File.cwd!(),
       tags: %{env: "production"},
       included_environments: [:prod]
