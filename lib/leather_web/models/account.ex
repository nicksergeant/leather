defmodule Leather.Account do
  @moduledoc "The Account model for Leather."

  alias Leather.Account
  import Ecto.Changeset
  use Ecto.Schema

  schema "accounts" do
    field :name, :string
    timestamps()
    belongs_to :user, Leather.User
    has_many :transactions, Leather.Transaction
    has_one :plaid_account, Leather.Plaid.Account
  end

  @doc false
  def changeset(%Account{} = account, attrs \\ :invalid) do
    account
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
