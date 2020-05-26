class OwnedStocksController < ApplicationController

  def new_total(stock, new_quantity)
    if stock.total_value == nil
      return new_quantity
    else
      return (stock.total_value.to_f + new_quantity.to_f).to_s
    end
  end

  def new_quantity(stock, new_quantity)
    if stock.total_quantity == nil
      return new_quantity
    else
      return (stock.total_quantity.to_i + new_quantity.to_i).to_s
    end
  end

  def new_balance(user, totalPrice)
    return (user.balance.to_i - totalPrice.to_i).to_s
  end

  # GET /ownedStocks
  def index
    @ownedStocks = OwnedStock.all

    render json: @ownedStocks
  end

  # GET /ownedStocks/1
  def show
  render json: @ownedStock
  end


  # POST /ownedStocks
  def create
    @ownedStock = OwnedStock.find_or_create_by(symbol: params[:symbol], name: params[:stockName])
    @transaction = Transaction.create(
      quantity: params[:quantity],
      price: params[:latestPrice],
      user_id: params[:userId],
      owned_stock_id: @ownedStock.id
    )
    @user = User.find_by(id: params[:userId])

    if @ownedStock.save
      @ownedStock.update(total_value: new_total(@ownedStock, params[:totalPrice]), total_quantity: new_quantity(@ownedStock, params[:quantity]))
      @user.update(balance: new_balance(@user, params[:totalPrice]))
      render json: {:ownedStock => @ownedStock, :transaction => @transaction, :balance => @user.balance}
    end
  end

  # PATCH/PUT /ownedStocks/1
  def update
    if @ownedStock.update(ownedStock_params)
      render json: @ownedStock
    else
      render json: @ownedStock.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ownedStocks/1
  def destroy
    @ownedStock.destroy
  end
end
