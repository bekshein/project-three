Rails.application.routes.draw do
  root 'application#welcome'

  get 'application/feed'
  # gets to overview

  get 'application/profile'
  # gets to profile page

  get 'application/newpost'
  # gets to new post

  get 'application/signup'
  # gets to signup

  get 'application/followers'
  # gets to followers

  get 'application/following'
  # gets to following

  get 'application/users'
  # gets to users

  # member method sets routes to users/:id/following or users/:id/followers
  resources :users, defaults: { format: :json } do
    member do
      get :following, :followers
    end
  end

  # used for follow and unfollow
  resources :relationships, only: [:create, :destroy], defaults: { format: :json }

  resources :posts, only: [:index, :create, :new], defaults: { format: :json }

  # session stuff
  get '/session' => 'session#current_user', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'

end
