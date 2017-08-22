defmodule LeatherWeb.UserController do
  use LeatherWeb, :controller

  plug :forbid_authenticated_users when action in
        [:login, :login_form, :signup, :signup_form]
  alias Leather.Repo
  alias Leather.User

  def login_form(conn, _params) do
    render conn, "login.html"
  end


  def signup_form(conn, _params) do
    changeset = User.registration_changeset(%User{})
    render conn, "signup.html", changeset: changeset
  end


  def login(conn, %{"session" => %{"username" => user, "password" => pass}}) do
    case Leather.Auth.login_by_username_and_pass(conn,
                                                 user,
                                                 pass,
                                                 repo: Repo) do
      {:ok, conn} ->
        conn
        |> put_flash(:info, "Welcome back!")
        |> redirect(to: "/")

      {:error, _reason, conn} ->
        conn
        |> put_flash(:error, "Invalid username/password combination")
        |> render("login.html")
    end
  end


  def logout(conn, _) do
    conn
    |> Leather.Auth.logout
    |> redirect(to: "/")
  end


  def signup(conn, %{"user" => user_params}) do
    changeset = User.registration_changeset(%User{}, user_params)
    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> Leather.Auth.login(user)
        |> put_flash(:info, "#{user.username} created!")
        |> redirect(to: "/")

      {:error, changeset} ->
        render conn, "signup.html", changeset: changeset
    end
  end


  defp require_authentication(conn, _opts) do
    if conn.assigns.current_user do
      conn
    else
      conn
      |> put_flash(:error, "You must be logged in to access this page.")
      |> redirect(to: user_path(conn, :signup))
      |> halt()
    end
  end


  defp forbid_authenticated_users(conn, _opts) do
    if conn.assigns.current_user do
      conn
      |> redirect(to: "/")
      |> halt()
    else
      conn
    end
  end
end
