Rails.application.routes.draw do
  root 'application#welcome'

  get 'application/angular'
  # gets to main app

  resources :posts, only: [:index, :create], defaults: {format: :json}
  resources :users

  # session stuff
  get '/session' => 'session#current_user', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'

end
