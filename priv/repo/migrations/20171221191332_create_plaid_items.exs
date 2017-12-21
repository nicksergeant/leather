defmodule Leather.Repo.Migrations.CreatePlaidItems do
  use Ecto.Migration

  def change do
    create table(:plaid_items) do
      add(:plaid_access_token, :string)
      add(:plaid_item_id, :string)
      add(:user_id, references(:users, on_delete: :nothing))

      timestamps()
    end

    create(index(:plaid_items, [:user_id]))
  end
end
