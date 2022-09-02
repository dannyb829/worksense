class ConversationsController < ApplicationController

    def index
        render json: ActiveModel::Serializer::CollectionSerializer.new(Conversation.all, serializer: ConversationSerializer, scope: @user)
    end

    def show
        convo = Conversation.find(params[:id])
        render json: convo, include: {:messages => {include: :user}}, status: :ok
    end
end
