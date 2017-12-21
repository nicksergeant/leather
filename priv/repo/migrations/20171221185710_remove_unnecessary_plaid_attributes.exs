defmodule Leather.Repo.Migrations.RemoveUnnecessaryPlaidAttributes do
  use Ecto.Migration

  def change do
    alter table(:plaid_accounts) do
      remove(:balance_available)
      remove(:balance_current)
      remove(:balance_limit)
    end
  end
end
