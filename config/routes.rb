Rails.application.routes.draw do
  root 'application#welcome'

  get 'application/vibezboard'
  # gets to overview

  get 'application/profile'
  # gets to profile page

  get 'application/newpost'
  # gets to new post

  get 'application/signup'
  # gets to signup

  resources :posts, only: [:index, :create, :new], defaults: { format: :json}
  resources :users, defaults: {format: :json}

  # session stuff
  get '/session' => 'session#current_user', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'

end
