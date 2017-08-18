defmodule LeatherWeb.UserController do
  use LeatherWeb, :controller
  alias Leather.Repo
  alias Leather.User

  def index(conn, _params) do
    users = Repo.all(User)
    render conn, "index.html", users: users
  end


  def show(conn, %{"id" => id}) do
    user = Repo.get(User, id)
    render conn, "show.html", user: user
  end


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
        |> redirect(to: user_path(conn, :index))

      {:error, changeset} ->
        render conn, "new.html", changeset: changeset
    end
  end
end
