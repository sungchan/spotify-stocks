class TransactionsController < ApplicationController

  def user_id
    self.user_id
  end
  # GET /transactions
  def index
    @transactions = Transaction.all

    render json: @transactions
  end

  # GET /transactions/1
  def show
    @transactions = Transaction.where(user_id: params[:userId])
    render json: @transactions
  end

  # POST /transactions
  def create
    @transaction = Transaction.new(transaction_params)

    if @transaction.save
      render json: @transaction, status: :created, location: @transaction
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /transactions/1
  def update
    if @transaction.update(transaction_params)
      render json: @transaction
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transactions/1
  def destroy
    @transaction.destroy
  end

end
