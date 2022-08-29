class ConversationChannel < ApplicationCable::Channel

  def subscribed
    stop_all_streams
    stream_from build_channel(params['data'].to_i)
  end
  
  def convo_load
    convo = Conversation.find(params['data'])
    ActionCable.server.broadcast(build_channel(convo.id), serialize_messages(convo.messages))
  end

  def recieve_message(data)
    convo = Conversation.find(params['data'])
    Message.create!(user: current_user, conversation: convo, content: data["content"])
    ActionCable.server.broadcast(build_channel(convo.id), serialize_messages(convo.messages))
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    ActionCable.server.broadcast(build_channel(convo.id), {message: "disconnected"})
    stop_all_streams
  end

  private 

  def serialize_messages(messages)
    ActiveModel::Serializer::CollectionSerializer.new(messages, serializer: MessageSerializer).as_json
  end

  def build_channel(channel)
    "convo_channel/#{channel}"
  end

end
