defmodule LeatherWeb.LinkChannel do
  @moduledoc false

  alias Leather.Account
  alias Leather.Repo
  alias Leather.User

  use LeatherWeb, :channel

  def join("link:" <> user_id, _params, socket) do
    is_authorized = user_id == Integer.to_string(socket.assigns.user.id)

    if is_authorized do
      {:ok, socket}
    else
      {:error, %{status: 404, message: "Not authorized."}}
    end
  end

  def handle_in(event, params, socket) do
    handle_in(event, params, socket.assigns.user, socket)
  end

  def handle_in("link_exchange_token", params, user, socket) do
    # TODO: exchange params["public_token"] with Plaid for access_token and item_id, then:
    # - create Plaid.Item w/ access_token, item_id, and params["metadata"]
    # - create associated Plaid.Accounts
    broadcast!(socket, "exchange_token_linked", %{foo: 1})
    {:reply, :ok, socket}
  end
end
