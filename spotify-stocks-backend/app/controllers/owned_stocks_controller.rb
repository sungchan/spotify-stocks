class OwnedStocksController < ApplicationController

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
    @ownedStock = OwnedStock.new(ownedStock_params)

    if @ownedStock.save
      render json: @ownedStock, status: :created, location: @ownedStock
    else
      render json: @ownedStock.errors, status: :unprocessable_entity
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
