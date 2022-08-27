class ConversationChannel < ApplicationCable::Channel

  def subscribed
    stream_from 'conversation_channel'
  end
  
  def convo_load
    convo = Conversation.find(params['data'].to_i)
    ActionCable.server.broadcast("conversation_channel", serialize_messages(convo.messages))
  end

  def recieve_message(data)
    convo = Conversation.find_by_id(data['convo_id'])
    if convo then Message.create!(user: current_user, conversation: convo, content: data["content"])
    end
    ActionCable.server.broadcast("conversation_channel", serialize_messages(convo.messages))
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    ActionCable.server.broadcast("conversation_channel", {message: "disconnected"})
  end

  private 

  def serialize_messages(messages)
    ActiveModel::Serializer::CollectionSerializer.new(messages, serializer: MessageSerializer).as_json
  end

end
