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

  resources :posts, only: [:index, :create, :new], defaults: { format: :json}
  resources :users, defaults: {format: :json}

  # session stuff
  get '/session' => 'session#current_user', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'

end
