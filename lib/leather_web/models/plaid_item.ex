defmodule Leather.Plaid.Item do
  @moduledoc "The Plaid.Item model for Leather. https://plaid.com/docs/api/#retrieve-item"

  alias Leather.Plaid.Item

  import Ecto.Changeset
  import Ecto.Query

  use Ecto.Schema

  schema "plaid_items" do
    field(:plaid_access_token, :string)
    field(:plaid_item_id, :string)
    timestamps()
    belongs_to(:user, Leather.User)
    has_many(:plaid_accounts, Leather.Plaid.Account)
  end

  @doc false
  def changeset(%Item{} = plaid_item, attrs \\ :invalid) do
    plaid_item
    |> cast(attrs, [:plaid_access_token, :plaid_item_id])
    |> validate_required([:plaid_access_token, :plaid_item_id, :user_id])
  end
end
