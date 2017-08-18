defmodule LeatherWeb.UserController do
  use LeatherWeb, :controller
  alias Leather.Repo
  alias Leather.User

  def new(conn, _params) do
    changeset = User.registration_changeset(%User{})
    render conn, "new.html", changeset: changeset
  end


  def create(conn, %{"user" => user_params}) do
    changeset = User.registration_changeset(%User{}, user_params)
    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "#{user.username} created!")
        |> redirect(to: "/")

      {:error, changeset} ->
        render conn, "new.html", changeset: changeset
    end
  end
end
