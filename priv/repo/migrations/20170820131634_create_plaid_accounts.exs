defmodule Leather.Repo.Migrations.CreatePlaidAccounts do
  use Ecto.Migration

  def change do
    create table(:plaid_accounts) do
      add :user_id, references(:users)
      add :account_id, references(:accounts)
      add :plaid_account_id, :string
      add :balance_available, :integer
      add :balance_current, :integer
      add :balance_limit, :integer
      add :name, :string
      add :official_name, :string
      add :type, :string
      add :subtype, :string
      add :mask, :integer
      timestamps()
    end

    create index(:plaid_accounts, [:user_id, :account_id])
  end
end
