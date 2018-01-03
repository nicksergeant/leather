defmodule LeatherWeb.PlaidItemView do
  @moduledoc false

  use LeatherWeb, :view

  def render("plaid_item.json", %{plaid_item: plaid_item}) do
    %{
      id: plaid_item.id,
      institution_name: plaid_item.institution_name
    }
  end
end
