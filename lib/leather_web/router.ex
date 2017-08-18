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

    get "/users", UserController, :index
    get "/signup", UserController, :signup
    post "/signup", UserController, :create
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", LeatherWeb do
  #   pipe_through :api
  # end
end
