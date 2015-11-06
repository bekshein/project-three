class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:message] = "You are now a registered user!"
    else
      flash[:message] = @user.errors.full_messages.to_sentence
    end

    redirect_to root_path
  end

  def user_params
    return params.require(:user).permit(:username, :email, :password)
  end
end
