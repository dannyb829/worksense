Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  resources :messages
  resources :conversations
  resources :notifications, only: :show
  resources :users, only: :update

  post '/login', to: "sessions#create"
  get '/logout', to: "sessions#destroy"
  get '/auth', to: "users#show"
  post '/username', to: "users#name_available?"
  post '/signup', to: "users#create"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
