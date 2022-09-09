Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  resources :messages, only: :create
  resources :conversations, only: [:index,:show,:create]
  resources :notifications, only: :show
  resources :users, only: :update

  #NOTIFICATIONS
  get '/convo/notifications/:convo_id', to: 'notifications#load_notifications'

 #SESSION
  post '/signin', to: "sessions#create"
  get '/logout', to: "sessions#destroy"

  #USER
  get '/auth', to: "users#show"
  post '/username', to: "users#name_available?"
  post '/signup', to: "users#create"

  # fallback for client side routing on react app
  get '*path', to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
