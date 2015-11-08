class UsersController < ApplicationController
  # prevents unauthorized access unless logged in, commenting out until done with testing
  # before_action :logged_in_user, only: [:edit, :update, :destroy, :following, :followers]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:message] = "You are now a registered user!"
    else
      flash[:message] = @user.errors.full_messages.to_sentence
    end

    redirect_to root_path
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      flash[:message] = "Update has been saved!"
    else
      flash[:message] = @user.errors.full_messages.to_sentence
    end

    redirect_to @user
  end

  def destroy
    @user = User.destroy(params[:id])
    flash[:success] = "User deleted!"
    redirect_to users_path
  end

private

  def user_params
    return params.require(:user).permit(:username, :email, :password)
  end

  # confirms a user is logged in
  def logged_in_user
    unless logged_in?
      flash[:danger] = "Please log in."
      redirect_to root_path
    end
  end
end
