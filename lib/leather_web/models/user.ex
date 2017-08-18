defmodule Leather.User do
  @moduledoc "The User model for Leather."

  import Ecto.Changeset
  use Ecto.Schema

  schema "users" do
    field :password, :string, virtual: true
    field :password_hash, :string
    field :username, :string
    timestamps()
  end
  def changeset(model, params \\ :invalid) do
    model
    |> cast(params, ~w(username))
    |> validate_length(:username, min: 1, max: 20)
  end


  def registration_changeset(model, params \\ :invalid) do
    model
    |> changeset(params)
    |> cast(params, ~w(password))
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
