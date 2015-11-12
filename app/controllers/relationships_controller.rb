class RelationshipsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    @relationship = Relationship.new(relationship_params)

    @relationship.save

      respond_to do |format|
        format.json  { render :json => @relationship }
      end

  end

  def destroy
    # @relationship = Relationship.where(follower_id:)
    @user = Relationship.find(params[:id]).followed
    current_user.unfollow(user)

    respond_to do |format|
      format.json  { render :json => @relationship }
    end
  end

  private

  def relationship_params
		params.require(:relationship)
			.permit(:follower_id, :followed_id)
	end

end
