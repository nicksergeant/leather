defmodule LeatherWeb.TransactionView do
  @moduledoc false

  use LeatherWeb, :view

  def render("transaction.json", %{transaction: transaction}) do
    %{
      account_id: transaction.account_id,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date,
      id: transaction.id,
      name: transaction.name,
      type: transaction.type
    }
  end
end
