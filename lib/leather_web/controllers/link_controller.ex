defmodule LeatherWeb.LinkController do
  @moduledoc false

  use LeatherWeb, :controller

  def exchange(conn, params) do
    json(conn, %{
      status: "ok"
    })
  end

  def webhook(conn, params) do
    json(conn, %{
      status: "ok"
    })
  end
end
