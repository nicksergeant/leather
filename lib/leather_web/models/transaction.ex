defmodule Leather.Transaction do
  @moduledoc "The Transaction model for Leather."

  alias Leather.Transaction

  import Ecto.Changeset

  use Ecto.Schema

  schema "transactions" do
    field :amount, :integer
    field :category, :string
    field :meta, :map
    field :name, :string
    field :official_name, :string
    field :source, :string
    field :type, :string
    timestamps()
    belongs_to :account, Leather.Account
  end

  @doc false
  def changeset(%Transaction{} = transaction, attrs) do
    transaction
    |> cast(attrs,
            [:amount, :category, :meta, :name, :official_name, :source, :type])
    |> validate_required([:amount, :name, :official_name, :type])
  end
end
