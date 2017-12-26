defmodule LeatherWeb.AccountsChannel do
  @moduledoc false

  alias Leather.Account
  alias Leather.Repo
  alias Leather.User

  use LeatherWeb, :channel

  def join("accounts:" <> user_id, _params, socket) do
    is_authorized = user_id == Integer.to_string(socket.assigns.user.id)

    if is_authorized do
      accounts = Ecto.assoc(socket.assigns.user, :accounts)

      accounts =
        accounts
        |> Repo.all()

      resp = %{
        accounts: Phoenix.View.render_many(accounts, LeatherWeb.AccountView, "account.json")
      }

      {:ok, resp, socket}
    else
      {:error, %{status: 404, message: "Not authorized."}}
    end
  end

  def handle_in(event, params, socket) do
    handle_in(event, params, socket.assigns.user, socket)
  end

  def handle_in("delete_account", params, user, socket) do
    account = Repo.get_by(Account, %{id: params["id"], user_id: socket.assigns.user.id})

    if account do
      changeset = Account.changeset(account, %{})

      case Repo.delete(changeset) do
        {:ok, account} ->
          rendered_account =
            Phoenix.View.render(LeatherWeb.AccountView, "account.json", %{account: account})

          broadcast!(socket, "account_deleted", rendered_account)
          {:reply, :ok, socket}

        {:error, changeset} ->
          {:reply, {:error, %{errors: changeset}}, socket}
      end
    else
      {:error, %{status: 404, message: "Account not found."}}
    end
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
