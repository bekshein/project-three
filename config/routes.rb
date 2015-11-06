Rails.application.routes.draw do
  root 'application#welcome'

  get 'application/dashboard'  
  # gets to main app

  resources :posts
  resources :users

  # session stuff
  get '/session' => 'session#current_user', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'

end
