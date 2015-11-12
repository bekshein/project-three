class PostsController < ApplicationController
  # prevents unauthorized access unless logged in, commenting out until done with testing
	# before_action :logged_in_user, only: [:create, :destroy]
	# before_action :correct_user, only: :destroy

	def index
		@posts = Post.all
		@users = User.all
	end

	def new
		@post = Post.new
	end

	def create
		@post = current_user.posts.new(post_params)

		if @post.save
			flash[:message] = "Post created!"

		else
			flash[:message] = @post.errors.full_messages.to_sentence
		end
	end

	def destroy
		@post = Post.find(params[:id])
		@post.destroy

		flash[:message] = "Post has been deleted"
	end

	private

	def post_params
		params.require(:post)
			.permit(:title, :source, :vibe, :like, :user_id)
	end

	def correct_user
		@post = current_user.posts.find_by(id: params[:id])
		redirect_to root_url if @post.nil?
	end

end
