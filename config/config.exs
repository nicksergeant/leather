use Mix.Config

config :leather,
  ecto_repos: [Leather.Repo],
  plaid_client_id: System.get_env("PLAID_CLIENT_ID"),
  plaid_env: "sandbox",
  plaid_public_key: System.get_env("PLAID_PUBLIC_KEY"),
  plaid_secret: System.get_env("PLAID_SECRET")

config :leather, LeatherWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "MGo9JCoFRW1YCVWqdIWtYupyVhSF1DblcU/Xr/KW1x+MTjCbdGwd1bbVOs/w1D1U",
  render_errors: [view: LeatherWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Leather.PubSub, adapter: Phoenix.PubSub.PG2]

config :logger, :console, format: "$time $metadata[$level] $message\n", metadata: [:request_id]
import_config "#{Mix.env()}.exs"
