class NotificationsController < ApplicationController

    def show 
        Notification.where(user: @user, conversation: Conversation.find_by(notify_params)).destroy_all
    end

    private

    def notify_params
        params.permit(:id)
    end
end
