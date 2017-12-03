defmodule LeatherWeb.UserSocket do
  @moduledoc false

  use Phoenix.Socket

  channel("accounts", LeatherWeb.AccountsChannel)
  channel("budgets:*", LeatherWeb.BudgetsChannel)
  channel("forecast:*", LeatherWeb.ForecastChannel)
  channel("stashes:*", LeatherWeb.StashesChannel)
  channel("transactions:*", LeatherWeb.TransactionsChannel)
  transport(:websocket, Phoenix.Transports.WebSocket)
  @max_age 2 * 7 * 24 * 60 * 60
  def connect(%{"token" => token}, socket) do
    case Phoenix.Token.verify(socket, "user socket", token, max_age: @max_age) do
      {:ok, user_id} ->
        user = Leather.Repo.get(Leather.User, user_id)
        {:ok, assign(socket, :user, user)}

      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, _socket) do
    :error
  end

  def id(socket) do
    "users_socket:#{socket.assigns.user.id}"
  end
end
