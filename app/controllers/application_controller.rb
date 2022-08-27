class ApplicationController < ActionController::API
    include ActionController::Cookies 
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    

    private

    def authorize
        @user = User.find_by_id(session[:user_id])
        render json: {error: 'Not Authorized'}, status: 401 unless @user
    end

    def record_not_found
        render json: {error: "#{controller_name.classify} not found"}, status: :not_found
    end

    def record_invalid(invalid)
        render json: {error: invalid.record.errors.full_messages }, status: 422
    end

end
