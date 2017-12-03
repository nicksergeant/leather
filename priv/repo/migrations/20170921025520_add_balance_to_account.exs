defmodule Leather.Repo.Migrations.AddBalanceToAccount do
  use Ecto.Migration

  def change do
    alter table(:accounts) do
      add(:balance_available, :integer, null: false, default: 0)
      add(:balance_current, :integer, null: false, default: 0)
      add(:balance_limit, :integer, null: false, default: 0)
    end
  end
end
