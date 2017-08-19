defmodule LeatherWeb.Router do
  use LeatherWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Leather.Auth, repo: Leather.Repo
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", LeatherWeb do
    pipe_through :browser # Use the default browser stack

    delete "/logout", UserController, :logout
    get "/login", UserController, :login_form
    get "/signup", UserController, :signup_form
    post "/login", UserController, :login
    post "/signup", UserController, :signup

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", LeatherWeb do
  #   pipe_through :api
  # end
end
