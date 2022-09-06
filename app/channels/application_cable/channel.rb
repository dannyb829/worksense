module ApplicationCable
  class Channel < ActionCable::Channel::Base

    private

    def serialize_conversations
        ActiveModel::Serializer::CollectionSerializer.new(Conversation.all, serializer: ConversationSerializer, scope: current_user)
    end
    
  end

end
