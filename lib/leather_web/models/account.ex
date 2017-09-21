defmodule Leather.Account do
  @moduledoc "The Account model for Leather."

  alias Leather.Account
  alias Leather.Repo
  alias Leather.Transaction
  import Ecto.Changeset
  import Ecto.Query
  use Ecto.Schema

  schema "accounts" do
    field :balance_available, :integer, default: 0
    field :balance_current, :integer, default: 0
    field :balance_limit, :integer, default: 0
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


  @doc false
  def calculate_balance(%Account{} = account) do
    transactions = Transaction
      |> Ecto.Query.where(account_id: ^account.id)
      |> Repo.all
    IO.inspect "calculating from #{Enum.count(transactions)} transactions"
  end
end
