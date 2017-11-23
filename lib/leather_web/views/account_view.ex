defmodule LeatherWeb.AccountView do
  @moduledoc false

  use LeatherWeb, :view

  def render("account.json", %{account: account}) do
    %{
      balance_available: account.balance_available,
      balance_current: account.balance_current,
      balance_limit: account.balance_limit,
      id: account.id,
      name: account.name
    }
  end
end
