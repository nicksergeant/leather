defmodule LeatherWeb.TransactionsChannel do
  @moduledoc false

  alias Leather.Account
  alias Leather.Repo
  alias Leather.Transaction

  use LeatherWeb, :channel

  def join("transactions:" <> account_id, _params, socket) do
    account =
      Repo.get_by(Account, %{id: account_id, user_id: socket.assigns.user.id})
    if account do
      transactions = Ecto.assoc(account, :transactions)
      transactions =
        transactions
        |> Repo.all()
      resp = %{
        transactions: Phoenix.View.render_many(transactions,
                                               LeatherWeb.TransactionView,
                                               "transaction.json"),
      }
      {:ok, resp, assign(socket, :account, account)}
    else
      {:error, %{status: 404, message: "Account not found."}}
    end
  end


  def handle_in("new_transaction", params, socket) do
    account = socket.assigns.account
    if account do
      changeset =
        account
        |> Ecto.build_assoc(:transactions)
        |> Transaction.changeset(params)
      case Repo.insert(changeset) do
        {:ok, transaction} ->
          reply_success socket, transaction, account, "transaction_added"

        {:error, changeset} ->
          {:reply, {:error, %{errors: changeset}}, socket}
      end
    else
      {:error, %{status: 404, message: "Account not found."}}
    end
  end

  def handle_in("update_transaction", params, socket) do
    account = socket.assigns.account
    transaction =
      Repo.get_by(Transaction, %{id: params["id"], account_id: account.id})
    if account && transaction do
      change = %{
        amount: params["amount"],
        category: params["category"],
        name: params["name"],
      }
      changeset = Transaction.changeset(transaction, change)
      case Repo.update(changeset) do
        {:ok, transaction} ->
          reply_success socket, transaction, account, "transaction_updated"

        {:error, changeset} ->
          {:reply, {:error, %{errors: changeset}}, socket}
      end
    else
      {:error, %{status: 404, message: "Account or transaction not found."}}
    end
  end


  defp reply_success(socket, transaction, account, action) do
    {:ok, updated_account} = Account.calculate_balance(account)
    rendered_account =
      Phoenix.View.render(LeatherWeb.AccountView,
                          "account.json",
                          %{account: updated_account})
    rendered_transaction =
      Phoenix.View.render(LeatherWeb.TransactionView,
                          "transaction.json",
                          %{transaction: transaction})
    broadcast! socket, "account_updated", rendered_account
    broadcast! socket, action, rendered_transaction
    {:reply, :ok, socket}
  end
end
