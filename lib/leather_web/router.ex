defmodule LeatherWeb.Router do
  use LeatherWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", LeatherWeb do
    pipe_through :browser # Use the default browser stack

    resources "/users", UserController, only: [:index, :show, :create]
    get "/signup", UserController, :new
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", LeatherWeb do
  #   pipe_through :api
  # end
end
