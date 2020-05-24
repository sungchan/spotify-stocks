Rails.application.routes.draw do
  resources :owned_stocks
  resources :transactions
  resources :users
  post '/auth', to:'auth#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
