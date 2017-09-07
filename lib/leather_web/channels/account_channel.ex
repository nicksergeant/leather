defmodule LeatherWeb.AccountChannel do
  use LeatherWeb, :channel

  def join("accounts:" <> account_id, _params, socket) do
    # TODO: Verify user owns account.
    {:ok, socket}
  end
end
