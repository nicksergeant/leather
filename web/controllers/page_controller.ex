defmodule Leather.PageController do
  use Leather.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
