class SessionsController < ApplicationController
    skip_before_action :authorize

    def create
        user = User.find_by_username(params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id 
            render json: user 
        else  
            render json: {error: "Incorrect username or password"}, status: 401
        end
    end

    def destroy 
        session.delete(:user_id)
        @user = nil
        head :ok
    end
    
end
