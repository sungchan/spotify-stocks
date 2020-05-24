class AuthController < ApplicationController

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      render json: {id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name}
    else
      render json: {error: "Could not authenticate"}, status: 401
    end
  end

end
