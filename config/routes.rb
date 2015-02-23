Rails.application.routes.draw do
  resources :submissions

  resources :drawrequests

  resources :comments

  get 'pages/index'

  root to: 'visitors#index'
  devise_for :users
  resources :users
end
