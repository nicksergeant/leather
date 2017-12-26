defmodule LeatherWeb.LinkChannel do
  @moduledoc false

  alias Leather.Account
  alias Leather.Repo
  alias Leather.User

  use LeatherWeb, :channel

  def join("link", _params, socket) do
    {:ok, %{}, socket}
  end

  def handle_in(event, params, socket) do
    handle_in(event, params, socket.assigns.user, socket)
  end

  def handle_in("link_exchange_token", params, user, socket) do
    IO.inspect(user)
    IO.inspect(params)
    # TODO: exchange params["public_token"] with Plaid for access_token and item_id, then:
    # - create Plaid.Item w/ access_token, item_id, and params["metadata"]
    # - create associated Plaid.Accounts
    {:reply, :ok, socket}
  end
end
