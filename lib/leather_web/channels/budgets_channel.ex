defmodule LeatherWeb.BudgetsChannel do
  @moduledoc false

  alias Leather.Account
  alias Leather.Repo

  use LeatherWeb, :channel

  def join("budgets:" <> account_id, _params, socket) do
    account =
      Repo.get_by(Account, %{id: account_id, user_id: socket.assigns.user.id})
    if account do
      resp = %{
        account: Phoenix.View.render(LeatherWeb.AccountView,
                                     "account.json",
                                     %{account: account}),
      }
      {:ok, resp, socket}
    else
      {:error, %{status: 404, message: "Account not found."}}
    end
  end
end
