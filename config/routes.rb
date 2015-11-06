Rails.application.routes.draw do
  root 'application#welcome'
  resources :posts
  resources :users

  # session stuff
  get '/session' => 'session#current_sinner', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'

end
