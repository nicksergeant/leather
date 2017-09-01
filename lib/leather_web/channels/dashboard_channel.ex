defmodule LeatherWeb.DashboardChannel do
  use LeatherWeb, :channel

  def join("dashboard", _params, socket) do
    :timer.send_interval 2000, :ping
    {:ok, socket}
  end


  def handle_info(:ping, socket) do
    count = socket.assigns[:count] || 1
    push socket, "ping", %{count: count}
    {:noreply, assign(socket, :count, count + 1)}
  end
end
