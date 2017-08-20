defmodule Leather.Repo.Migrations.ChangeTransactions do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add :source, :string, default: "manual", size: 16
      add :meta, :map
    end
  end
end
