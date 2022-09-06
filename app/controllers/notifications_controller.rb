class NotificationsController < ApplicationController

    def show 
        Notification.where(user: @user, conversation: Conversation.find_by(notify_params)).destroy_all
    end

    def load_notifications
        render json: Notification.where(conversation: Conversation.find(params[:convo_id]), user: @user).count
    end

    private

    def notify_params
        params.permit(:id)
    end
    
end
