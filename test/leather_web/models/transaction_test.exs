defmodule Leather.TransactionTest do
  use Leather.DataCase
  require IEx

  test "A new transaction" do
    {:ok, user} = %Leather.User{}
                  |> Leather.User.changeset(%{username: "lebowski"})
                  |> Repo.insert

    {:ok, _account} = Leather.Account.changeset(
                        %Leather.Account{},
                        %{account_id: "abc123", name: "Some Bank Account", user_id: user.id}
                      )
                      |> Repo.insert

    {:ok, transaction} = Leather.Transaction.changeset(
      %Leather.Transaction{},
      %{
        name: "A Transaction",
        amount: 908,
        official_name: "A Transaction",
        type: "dunno",
        meta: %{
          amount: 9.08,
          account_id: "supercalifragilistic"
        }
      }
    ) |> Repo.insert

    assert transaction.meta[:account_id] == "supercalifragilistic"
    assert transaction.meta[:amount] == 9.08
  end
end