class OwnedStockSerializer < ActiveModel::Serializer
  attributes :id, :name, :symbol, :total_quantity, :total_value
  has_many :transactions


end
