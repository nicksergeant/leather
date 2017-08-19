defmodule Leather.User do
  @moduledoc "The User model for Leather."

  alias Leather.User
  import Ecto.Changeset
  use Ecto.Schema

  schema "users" do
    field :password, :string, virtual: true
    field :password_hash, :string
    field :username, :string
    timestamps()
    has_many :accounts, Leather.Account
  end

  @doc false
  def changeset(%User{} = user, attrs \\ :invalid) do
    user
    |> cast(attrs, [:username])
    |> validate_length(:username, min: 1, max: 20)
  end


  @doc false
  def registration_changeset(%User{} = user, attrs \\ :invalid) do
    user
    |> changeset(attrs)
    |> cast(attrs, [:password])
    |> validate_length(:password, min: 6, max: 100)
    |> put_pass_hash()
  end


  defp put_pass_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass)

      _ ->
        changeset
    end
  end
end
