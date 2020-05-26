class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :balance
  has_many :transactions
  has_many :owned_stocks

  def owned_stocks
    @transactions = self.object.transactions.where(user_id: self.object.id)
    @transactions.map do |d|
      {
        name: OwnedStock.find_by(id: d.owned_stock_id).name,
        symbol: OwnedStock.find_by(id: d.owned_stock_id).symbol,
        total_quantity: OwnedStock.find_by(id: d.owned_stock_id).total_quantity,
        total_value: OwnedStock.find_by(id: d.owned_stock_id).total_value
      }
    end.uniq
  end


end
