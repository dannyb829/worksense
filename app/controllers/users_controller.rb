class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def show
        render json: @user
    end

    def create
        User.create!(user_params)
        render json: {message: "Account created"}, status: 201
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
