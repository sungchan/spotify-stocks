class CreateOwnedStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :owned_stocks do |t|
      t.string :name
      t.string :symbol
      t.string :total_quantity
      t.string :total_value

      t.timestamps
    end
  end
end
