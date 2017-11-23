defmodule LeatherWeb.AccountsChannel do
  @moduledoc false

  alias Leather.Account
  alias Leather.Repo
  alias Leather.User

  use LeatherWeb, :channel

  def join("accounts", _params, socket) do
    accounts = Ecto.assoc(socket.assigns.user, :accounts)

    accounts =
      accounts
      |> Repo.all()

    resp = %{
      accounts: Phoenix.View.render_many(accounts, LeatherWeb.AccountView, "account.json")
    }

    {:ok, resp, socket}
  end

  def handle_in(event, params, socket) do
    handle_in(event, params, socket.assigns.user, socket)
  end

  def handle_in("new_account", params, user, socket) do
    changeset =
      user
      |> Ecto.build_assoc(:accounts)
      |> Account.changeset(params)

    case Repo.insert(changeset) do
      {:ok, account} ->
        rendered_account =
          Phoenix.View.render(LeatherWeb.AccountView, "account.json", %{account: account})

        broadcast!(socket, "account_added", rendered_account)
        {:reply, :ok, socket}

      {:error, changeset} ->
        {:reply, {:error, %{errors: changeset}}, socket}
    end
  end
end
