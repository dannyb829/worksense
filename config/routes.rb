Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  resources :messages, only: :create
  resources :conversations, only: [:index,:show,:create]
  resources :notifications, only: :show
  resources :users, only: :update

  get '/convo/notifications/:convo_id', to: 'notifications#load_notifications'

  post '/signin', to: "sessions#create"
  get '/logout', to: "sessions#destroy"
  get '/auth', to: "users#show"
  post '/username', to: "users#name_available?"
  post '/signup', to: "users#create"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
