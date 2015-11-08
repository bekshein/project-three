Rails.application.routes.draw do
  root 'application#welcome'

  resources :posts

  # used for follow and unfollow
  resources :relationships, only: [:create, :destroy]

  # member method sets routes to users/:id/following or users/:id/followers
  resources :users do
    member do
      get :following, :followers
    end
  end

  # session stuff
  get '/session' => 'session#current_user', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'

end
