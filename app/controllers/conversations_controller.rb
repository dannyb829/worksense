class ConversationsController < ApplicationController

    def index
        render json: Conversation.limit(10)
    end

    def show
        convo = Conversation.find(params[:id])
        render json: convo, include: {:messages => {include: :user}}, status: :ok
    end
end
