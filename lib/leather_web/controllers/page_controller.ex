defmodule LeatherWeb.PageController do
  @moduledoc false

  use LeatherWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def thing(conn, _params) do
    render()
  end
end
