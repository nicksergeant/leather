defmodule LeatherWeb.DashboardChannel do
  alias Leather.Account
  alias Leather.Repo
  alias Leather.User
  use LeatherWeb, :channel

  def join("dashboard", _params, socket) do
    # TODO: Store user in socket so we don't 
    # have to get again in handle_in ?
    user = Repo.get(User, socket.assigns.user_id)
    accounts = Ecto.assoc(user, :accounts)
      |> Repo.all
    resp = %{
      accounts: Phoenix.View.render_many(accounts,
                                         LeatherWeb.AccountView,
                                         "account.json"),
    }
    {:ok, resp, socket}
  end


  def handle_in(event, params, socket) do
    user = Repo.get(User, socket.assigns.user_id)
    handle_in event, params, user, socket
  end

  def handle_in("new_account", params, user, socket) do
    changeset = user
      |> Ecto.build_assoc(:accounts)
      |> Account.changeset(params)
    case Repo.insert(changeset) do
      {:ok, account} ->
        {:reply, {:ok, %{id: account.id, name: account.name}}, socket}

      {:error, changeset} ->
        {:reply, {:error, %{errors: changeset}}, socket}
    end
  end
end
