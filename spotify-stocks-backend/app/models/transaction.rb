class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :owned_stock
end
