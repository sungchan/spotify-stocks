class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :quantity
      t.string :price
      t.integer :user_id
      t.integer :owned_stock_id

      t.timestamps
    end
  end
end
