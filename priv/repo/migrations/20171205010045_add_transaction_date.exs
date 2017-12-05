defmodule Leather.Repo.Migrations.AddTransactionDate do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add(:date, :date, null: false, default: fragment("current_date"))
    end
  end
end
