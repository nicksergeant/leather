defmodule Leather.DataCase do
  @moduledoc "This module defines the setup for tests requiring\naccess to the application's data layer.\n\nYou may define functions here to be used as helpers in\nyour tests.\n\nFinally, if the test case interacts with the database,\nit cannot be async. For this reason, every test runs\ninside a transaction which is reset at the beginning\nof the test unless the test case is marked as async.\n"

  use ExUnit.CaseTemplate

  using do
    quote do
      alias Leather.Repo

      import Ecto
      import Ecto.Changeset
      import Ecto.Query
      import Leather.DataCase
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Leather.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Leather.Repo, {:shared, self()})
    end

    :ok
  end

  @doc "A helper that transform changeset errors to a map of messages.\n\n    assert {:error, changeset} = Accounts.create_user(%{password: \"short\"})\n    assert \"password is too short\" in errors_on(changeset).password\n    assert %{password: [\"password is too short\"]} = errors_on(changeset)\n\n"
  def errors_on(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {message, opts} ->
      Enum.reduce(opts, message, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
