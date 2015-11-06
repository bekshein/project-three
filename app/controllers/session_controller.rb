class SessionController < ApplicationController

  def create
    user = User.find_by(email: user_params[:email])

    if user && user.authenticate(user_params[:password])
      # session[:current_user_id] = user.id

    token = SecureRandom.urlsafe_base64

    session[:session_token] = token
    user.update(session_token: token)

    flash[:message] = "Thanks for logging in"
  else
    flash[:message] = "Email / Password combo does not exist"
  end

  redirect_to root_path
  end

  def destroy
     log_out!

     flash[:message] = "You are now logged out."

     redirect_to root_path
  end

  def user_params
    return params.require(:user).permit(:email, :password)
  end
end
