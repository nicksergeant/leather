defmodule LeatherWeb.AccountView do
  use LeatherWeb, :view

  def render("account.json", %{account: account}) do
    %{id: account.id, name: account.name}
  end
end
