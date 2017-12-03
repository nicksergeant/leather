defmodule Leather.User do
  @moduledoc "The User model for Leather."

  alias Leather.User

  import Ecto.Changeset

  use Ecto.Schema

  schema "users" do
    field(:password, :string, virtual: true)
    field(:password_hash, :string)
    field(:email, :string)
    timestamps()
    has_many(:accounts, Leather.Account)
    has_many(:plaid_accounts, Leather.Plaid.Account)
  end

  @doc false
  def registration_changeset(%User{} = user, attrs \\ :invalid) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_format(:email, ~r/@/)
    |> validate_required([:password])
    |> validate_length(:password, min: 6, max: 100)
    |> validate_confirmation(:password)
    |> unique_constraint(:email)
    |> put_pass_hash()
  end

  defp put_pass_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))

      _ ->
        changeset
    end
  end
end
