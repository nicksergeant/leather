defmodule Leather.Transaction do
  @moduledoc "The Transaction model for Leather."

  alias Leather.Transaction
  import Ecto.Changeset
  use Ecto.Schema

  schema "transactions" do
    field :amount, :integer
    field :name, :string
    field :official_name, :string
    field :type, :string
    timestamps()
    belongs_to :account, Leather.Account
  end

  @doc false
  def changeset(%Transaction{} = transaction, attrs) do
    transaction
    |> cast(attrs, [:name, :official_name, :type, :amount])
    |> validate_required([:name, :official_name, :type, :amount])
  end
end
