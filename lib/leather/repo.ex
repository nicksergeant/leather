defmodule Leather.Repo do
  @moduledoc false

  use Ecto.Repo, otp_app: :leather

  @doc "Dynamically loads the repository url from the\nDATABASE_URL environment variable.\n"
  def init(_, opts) do
    {:ok, Keyword.put(opts, :url, System.get_env("DATABASE_URL"))}
  end
end
