defmodule LeatherWeb.UserController do
  use LeatherWeb, :controller

  plug :authenticate when action in [:index]
  alias Leather.Repo
  alias Leather.User

  def index(conn, _params) do
    users = Repo.all(User)
    render conn, "index.html", users: users
  end


  def signup(conn, _params) do
    changeset = User.registration_changeset(%User{})
    render conn, "signup.html", changeset: changeset
  end


  def create(conn, %{"user" => user_params}) do
    changeset = User.registration_changeset(%User{}, user_params)
    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "#{user.username} created!")
        |> redirect(to: "/")

      {:error, changeset} ->
        render conn, "signup.html", changeset: changeset
    end
  end


  defp authenticate(conn, _opts) do
    if conn.assigns.current_user do
      conn
    else
      conn
      |> put_flash(:error, "You must be logged in to access this page.")
      |> redirect(to: user_path(conn, :signup))
      |> halt()
    end
  end
end
