defmodule Leather.Repo.Migrations.CreateTransactions do
  use Ecto.Migration

  def change do
    create table(:transactions) do
      add(:account_id, references(:accounts, on_delete: :nothing))
      add(:amount, :integer)
      add(:meta, :map)
      add(:name, :string)
      add(:official_name, :string)
      add(:source, :string, default: "manual", size: 16)
      add(:type, :string)

      timestamps()
    end

    create(index(:transactions, [:account_id]))
  end
end
