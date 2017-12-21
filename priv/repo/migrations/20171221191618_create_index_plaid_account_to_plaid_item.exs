defmodule Leather.Repo.Migrations.CreateIndexPlaidAccountToPlaidItem do
  use Ecto.Migration

  def change do
    alter table(:plaid_accounts) do
      add(:plaid_item_id, references(:plaid_items, on_delete: :delete_all))
    end

    create(index(:plaid_accounts, [:plaid_item_id]))
  end
end
