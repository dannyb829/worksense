module ApplicationCable
  class Channel < ActionCable::Channel::Base

    private

    def serialize_conversations
        ActiveModel::Serializer::CollectionSerializer.new(Conversation.order('created_at DESC'), serializer: ConversationSerializer, scope: current_user)
    end
    
  end

end
