class RelationshipsController < ApplicationController

  def create
    @user = User.find(params[:followed_id])
    current_user.follow(user)
    # response to ajax requests, rails will call a .js.erb file wtih same name as the action
    respond_to do |format|
      format.html { redirect_to @user }
      format.js
    end
  end

  def destroy
    @user = Relationship.find(params[:id]).followed
    current_user.unfollow(user)
    # response to ajax requests, rails will call a .js.erb file wtih same name as the action
    respond_to do |format|
      format.html { redirect_to @user }
      format.js
    end
  end

end
