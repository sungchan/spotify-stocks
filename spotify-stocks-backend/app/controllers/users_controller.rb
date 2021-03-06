class UsersController < ApplicationController

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    @user = User.find_by(id: params[:id])
    render json: @user
  end

  # POST /users
  def create
    if User.find_by(email: params[:email])
      render json: {error: "This email is already in use"}
    else
      @user = User.new(
        first_name: params['first_name'],
        last_name: params['last_name'],
        email: params['email'],
        password: params['password']
      )
      if @user.save
        render json: @user
      end
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

end
