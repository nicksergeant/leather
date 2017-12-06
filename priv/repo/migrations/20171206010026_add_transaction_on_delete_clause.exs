defmodule Leather.Repo.Migrations.AddTransactionOnDeleteClause do
  use Ecto.Migration

  def up do
    execute "ALTER TABLE transactions DROP CONSTRAINT transactions_account_id_fkey"
    alter table(:transactions) do
      modify :account_id, references(:accounts, on_delete: :delete_all)
    end
  end

  def down do
    execute "ALTER TABLE transactions DROP CONSTRAINT transactions_account_id_fkey"
    alter table(:transactions) do
      modify :account_id, references(:accounts, on_delete: :nothing)
    end
  end
end
