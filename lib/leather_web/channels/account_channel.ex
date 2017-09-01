defmodule LeatherWeb.AccountChannel do
  use LeatherWeb, :channel

  def join("accounts:" <> account_id, _params, socket) do
    :timer.send_interval 2000, :ping
    throw(:testerror)
    {:ok, socket}
  end


  def handle_info(:ping, socket) do
    count = socket.assigns[:count] || 1
    push socket, "ping", %{count: count}
    {:noreply, assign(socket, :count, count + 1)}
  end
end
