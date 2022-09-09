class ConversationsController < ApplicationController

    def index
        render json: ActiveModel::Serializer::CollectionSerializer.new(Conversation.order('created_at DESC'), serializer: ConversationSerializer, scope: @user)
    end

    def show
        convo = Conversation.find(params[:id])
        render json: convo, include: {:messages => {include: :user}}, status: :ok
    end

    def create
        Conversation.create!(conversation_params)
        UpdateConversationsJob.perform_later(@user)
    end

    private
#strong params
    def conversation_params
        params.permit(:name,:description)
    end

end
