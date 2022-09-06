class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def show
        if params[:username]
            used = User.find_by_username(params[:username])
            if !used
                render json: {}, status: 200
            else 
                render json: {}, status: 422
            end
        else
            render json: @user
        end
    end

    def create
        User.create!(user_params)
        render json: {message: "Account created"}, status: 201
    end

    def update
        @user.update!(user_params)
        render json: @user, status: 202
    end

    private

    def user_params
        params.require(:user).permit(:id,:username,:image_url, :password, :password_confirmation)
    end
end
