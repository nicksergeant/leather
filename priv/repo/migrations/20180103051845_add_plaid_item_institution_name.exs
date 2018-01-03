defmodule Leather.Repo.Migrations.AddPlaidItemInstitutionName do
  use Ecto.Migration

  def change do
    alter table(:plaid_items) do
      add(:institution_name, :string)
    end
  end
end
