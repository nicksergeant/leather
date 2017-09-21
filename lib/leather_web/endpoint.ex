defmodule LeatherWeb.Endpoint do
  @moduledoc false

  use Phoenix.Endpoint, otp_app: :leather

  socket "/socket", LeatherWeb.UserSocket
  plug Plug.Static,
       at: "/",
       cache_control_for_etags: "public, max-age=31536000",
       from: :leather,
       gzip: System.get_env("GZIP_ENABLED") === "true" || false,
       only: ~w(css fonts images js favicon.ico robots.txt)
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end
  plug Plug.RequestId
  plug Plug.Logger
  plug Plug.Parsers,
       parsers: [:urlencoded, :multipart, :json],
       pass: ["*/*"],
       json_decoder: Poison
  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session,
       encryption_salt: System.get_env("ENCRYPTION_SALT") || "",
       key: "_leather_key",
       signing_salt: "y4EdJQIc",
       store: :cookie
  plug LeatherWeb.Router

  @doc "Callback invoked for dynamically configuring the endpoint.\n\nIt receives the endpoint configuration and checks if\nconfiguration should be loaded from the system environment.\n"
  def init(_key, config) do
    if config[:load_from_system_env] do
      port =
        System.get_env("PORT") ||
          raise("expected the PORT environment variable to be set")
      {:ok, Keyword.put(config, :http, [:inet6, {:port, port}])}
    else
      {:ok, config}
    end
  end
end
