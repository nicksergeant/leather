defmodule Leather.Repo.Migrations.AddCategoryToTransaction do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add :category, :string
    end
  end
end
