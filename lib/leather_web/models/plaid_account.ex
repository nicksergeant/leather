defmodule Leather.Plaid.Account do
  @moduledoc "The Plaid.Account model for Leather. https://plaid.com/docs/api/#accounts"

  import Ecto.Changeset

  use Ecto.Schema

  schema "plaid_accounts" do
    field(:mask, :integer)
    field(:name, :string)
    field(:official_name, :string)
    field(:plaid_account_id, :string)
    field(:subtype, :string)
    field(:type, :string)
    timestamps()
    belongs_to(:account, Leather.Account)
    belongs_to(:plaid_item, Leather.Plaid.Item)
    belongs_to(:user, Leather.User)
  end

  def changeset(plaid_account, params \\ :invalid) do
    plaid_account
    |> cast(
      params,
      ~w(account_id mask name official_name plaid_account_id subtype type user_id)
    )
    |> validate_required([:user_id, :name])
  end
end
