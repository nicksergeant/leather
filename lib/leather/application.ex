defmodule Leather.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      supervisor(Leather.Repo, []),
      supervisor(LeatherWeb.Endpoint, []),
    ]

    opts = [strategy: :one_for_one, name: Leather.Supervisor]

    if Mix.env == :prod do
      :ok = :error_logger.add_report_handler(Sentry.Logger)
    end

    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    LeatherWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
