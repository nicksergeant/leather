defmodule LeatherWeb.UserSocket do
  use Phoenix.Socket

  # Channels
  channel "accounts:*", LeatherWeb.AccountChannel
  channel "dashboard", LeatherWeb.DashboardChannel
  # Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll
  @max_age 2 * 7 * 24 * 60 * 60
  def connect(%{"token" => token}, socket) do
    case Phoenix.Token.verify(socket,
                              "user socket",
                              token,
                              max_age: @max_age) do
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
