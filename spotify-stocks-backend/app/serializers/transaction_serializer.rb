class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :price, :name, :symbol
  # belongs_to :user, foreign_key: 'user_id'
  # belongs_to :owned_stock, foreign_key: 'owned_stock_id'

  def name
    self.object.owned_stock.name
  end

  def symbol
    self.object.owned_stock.symbol
  end
end
