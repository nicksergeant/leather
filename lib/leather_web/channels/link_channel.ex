defmodule LeatherWeb.LinkChannel do
  @moduledoc false

  require Logger

  alias Leather.Account
  alias Leather.Plaid.Item
  alias Leather.Repo
  alias Leather.User
  alias LeatherWeb.PlaidItemView
  alias Phoenix.View

  use LeatherWeb, :channel

  def join("link:" <> user_id, _params, socket) do
    is_authorized = user_id == Integer.to_string(socket.assigns.user.id)

    if is_authorized do
      plaid_items = Ecto.assoc(socket.assigns.user, :plaid_items)

      plaid_items =
        plaid_items
        |> Repo.all()

      resp = %{
        plaid_items: View.render_many(plaid_items, PlaidItemView, "plaid_item.json")
      }

      {:ok, resp, socket}
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

        if body["access_token"] do
          changeset =
            user
            |> Ecto.build_assoc(:plaid_items)
            |> Item.changeset(%{
              institution_name: params["metadata"]["institution"]["name"],
              plaid_access_token: body["access_token"],
              plaid_item_id: body["item_id"]
            })

          case Repo.insert(changeset) do
            {:ok, plaid_item} ->
              # - create associated Plaid.Accounts (might need to hit accounts/get)
              rendered_plaid_item =
                View.render(PlaidItemView, "plaid_item.json", %{plaid_item: plaid_item})

              broadcast!(socket, "plaid_item_added", rendered_plaid_item)
              {:reply, :ok, socket}

            {:error, changeset} ->
              {:reply, {:error, %{errors: changeset}}, socket}
          end
        else
          {:reply, :error, socket}
        end

      {:ok, %HTTPoison.Response{status_code: 400, body: body}} ->
        Logger.error("Plaid error at #{url}: #{body}")
        {:reply, :error, socket}
    end
  end
end
