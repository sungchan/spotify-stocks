class User < ApplicationRecord
  has_many :transactions
  has_many :owned_stocks, through: :transactions
end
