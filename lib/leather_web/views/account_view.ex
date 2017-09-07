defmodule LeatherWeb.AccountView do
  use LeatherWeb, :view

  def render("account.json", %{account: acc}) do
    %{id: acc.id, name: acc.name}
  end
end
