class AuthController < ApplicationController

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
        balance: user.balance
      }
    else
      render json: {error: "Could not authenticate"}, status: 401
    end
  end

end
