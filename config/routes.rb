Rails.application.routes.draw do
  root 'application#welcome'

  get 'application/vibezboard'
  # gets to overview

  get 'application/profile'
  # gets to profile page

  get 'application/newpost'
  # gets to new post

  resources :posts, only: [:index, :create, :new], defaults: { format: :json }

  # member method sets routes to users/:id/following or users/:id/followers
  resources :users, defaults: { format: :json } do
    member do
      get :following, :followers
    end
  end

  # used for follow and unfollow
  resources :relationships, only: [:create, :destroy]

  # session stuff
  get '/session' => 'session#current_user', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'

end
