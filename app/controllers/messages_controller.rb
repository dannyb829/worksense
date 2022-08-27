class MessagesController < ApplicationController

    def create
        new_message = Message.create!(message_params)
        render json: new_message
    end

    private

    def message_params
        params.permit(:user_id, :conversation_id, :content)
    end
    
end
