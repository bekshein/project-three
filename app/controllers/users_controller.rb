class UsersController < ApplicationController
<<<<<<< HEAD
<<<<<<< HEAD
  # prevents unauthorized access unless logged in, commenting out until done with testing
  # before_action :logged_in_user, only: [:edit, :update, :destroy, :following, :followers]
  # before_action :correct_user, only: [:edit, :update]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.posts
  end
=======
>>>>>>> 61d50e90adbc5d477f3d25d251b7500caf5fa116

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:message] = "You are now a registered user!"
      redirect_to application_feed_path
    else
      flash[:message] = @user.errors.full_messages.to_sentence
      redirect_to root_path
    end

  end

  def update
    @user = User.find(params[:id])
<<<<<<< HEAD


    if @user.update(user_params)
      flash[:message] = "Update has been saved!"
    else
      flash[:message] = @user.errors.full_messages.to_sentence
    end
  end

  def destroy
    @user = User.destroy(params[:id])
    flash[:message] = "User deleted!"
    redirect_to users_path
  end

  # methods to show index of following/followers users
  def following
    @title = "Following"
    @user = User.find(params[:id])
    @users = @user.following
    render 'following'
  end

  def followers
    @title = "Followers"
    @user = User.find(params[:id])
    @users = @user.followers
    render 'followers'
  end
=======

    if @user && @user.update(user_params)
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  private
>>>>>>> 61d50e90adbc5d477f3d25d251b7500caf5fa116

private


  def user_params
    return params.require(:user).permit(:username, :email, :password)
  end

  # confirms a user is logged in
  def logged_in_user
    unless logged_in?
      flash[:message] = "Please log in."
      redirect_to root_path
    end
  end

  # confirms the correct user.
  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end

end
