class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :quantity
      t.string :price
      t.string :user_id
      t.string :stock_id

      t.timestamps
    end
  end
end
