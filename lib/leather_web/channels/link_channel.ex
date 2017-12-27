defmodule LeatherWeb.LinkChannel do
  @moduledoc false

  require Logger

  alias Leather.Account
  alias Leather.Repo
  alias Leather.User

  use LeatherWeb, :channel

  def join("link:" <> user_id, _params, socket) do
    is_authorized = user_id == Integer.to_string(socket.assigns.user.id)

    if is_authorized do
      # TODO: return plaid_items
      {:ok, socket}
    else
      {:error, %{status: 404, message: "Not authorized."}}
    end
  end

  def handle_in(event, params, socket) do
    handle_in(event, params, socket.assigns.user, socket)
  end

  def handle_in("link_exchange_token", params, user, socket) do
    plaid_client_id = Application.get_env(:leather, :plaid_client_id)
    plaid_env = Application.get_env(:leather, :plaid_env)
    plaid_secret = Application.get_env(:leather, :plaid_secret)

    url = "https://#{plaid_env}.plaid.com/item/public_token/exchange"

    body =
      Poison.encode!(%{
        client_id: plaid_client_id,
        public_token: params["public_token"],
        secret: plaid_secret
      })

    response = HTTPoison.post(url, body, [{"Content-type", "application/json"}])

    case response do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        body = Poison.decode!(body)
        IO.inspect(body)
        # - create Plaid.Item w/ access_token, item_id, and params["metadata"]
        # - create associated Plaid.Accounts
        # broadcast!(socket, "plaid_item_added", %{id: 1})
        {:reply, :ok, socket}

      {:ok, %HTTPoison.Response{status_code: 400, body: body}} ->
        Logger.error("Plaid error at #{url}: #{body}")
        {:reply, :error, socket}
    end
  end
end
