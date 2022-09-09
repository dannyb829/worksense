class UpdateConversationsJob < ApplicationJob
  queue_as :default

  def perform(user)
    # Do something later
    ActionCable.server.broadcast('conversations_channel', serialize_conversations(user))
  end

  private 

  def serialize_conversations(user)
    ActiveModel::Serializer::CollectionSerializer.new(Conversation.order('created_at DESC'), serializer: ConversationSerializer, scope: user)
  end

end
