class MessagesChannel < ApplicationCable::Channel

  def subscribed
    stop_all_streams
    stream_from build_channel(params['data'].to_i)
  end
  
  def messages_load
    convo = Conversation.find(params['data'])
    ActionCable.server.broadcast(build_channel(convo.id), serialize_messages(convo.messages))
    convo.notifications.where(user: current_user).destroy_all
  end

  def recieve_message(data)
    convo = Conversation.find(params['data'])
    Message.create!(user: current_user, conversation: convo, content: data["content"])
    NotifyAllJob.perform_later(convo,current_user)
    UpdateConversationsJob.perform_later(current_user)
    messages_load
  end

  def unsubscribed
    ActionCable.server.broadcast(build_channel(params['data'].to_i), {message: "disconnected"})
    stop_all_streams
  end

  private 

  def serialize_messages(messages)
    ActiveModel::Serializer::CollectionSerializer.new(messages, serializer: MessageSerializer).as_json
  end

  def build_channel(channel)
    "messages_channel/#{channel}"
  end

end
