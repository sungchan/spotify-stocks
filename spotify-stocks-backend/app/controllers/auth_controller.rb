class AuthController < ApplicationController

  def ownedStocks(transactions)
    transactions.map do |d|
      {
        name: OwnedStock.find_by(id: d.owned_stock_id).name,
        symbol: OwnedStock.find_by(id: d.owned_stock_id).symbol,
        total_quantity: OwnedStock.find_by(id: d.owned_stock_id).total_quantity,
        total_value: OwnedStock.find_by(id: d.owned_stock_id).total_value
      }
    end.uniq
  end

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      render json: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        balance: user.balance,
        token: issue_token({id: user.id})
      }
    else
      render json: {error: "Could not authenticate"}, status: 401
    end
  end

  def show
    token = request.headers['Authenticate']
    decoded_id = JWT.decode(token, 'secret', true, { algorithm: 'HS256'}).first['id']
    user ||= User.find_by(id: decoded_id)


    if user
      render json: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        balance: user.balance,
        transactions: user.transactions,
        owned_stocks: user.owned_stocks,
        transactions: user.transactions,
        owned_stocks: ownedStocks(user.transactions)

      }
    else
      render json: {error: "Could not authenticate"}, status: 401
    end
  end

end
