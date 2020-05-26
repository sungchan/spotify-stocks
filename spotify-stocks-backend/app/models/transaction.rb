class Transaction < ApplicationRecord
  belongs_to :user, foreign_key: 'user_id'
  belongs_to :owned_stock, foreign_key: 'owned_stock_id'
end
