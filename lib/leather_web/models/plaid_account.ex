defmodule Leather.Plaid.Account do
  @moduledoc "The Account model for Leather. https://plaid.com/docs/api/#accounts"

  import Ecto.Changeset
  use Ecto.Schema

  schema "plaid_accounts" do
    field :plaid_account_id, :string
    field :balance_available, :integer
    field :balance_current, :integer
    field :balance_limit, :integer
    field :name, :string # The name of the Account, either assigned by the user or the financial institution itself.
    field :official_name, :string # The official name of the Account as given by the financial institution.
    field :type, :string # depository, credit, loan, mortgage, brokerage, other
    field :subtype, :string # checking, savings, money market, prepaid, etc
    field :mask, :integer # The last four digits of the Account's number.
    timestamps()

    belongs_to(:user, Leather.User)
    belongs_to(:account, Leather.Account)
  end

  def changeset(model, params \\ :invalid) do
    model
    |> cast(params, ~w(user_id account_id plaid_account_id balance_available balance_current balance_limit name official_name type subtype mask))
    |> validate_required([:user_id, :account_id, :name])
  end

end