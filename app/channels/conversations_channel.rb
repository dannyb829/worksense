class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    # stream_from "some_channel"
    stream_from 'conversations_channel'
    ActionCable.server.broadcast('conversations_channel', serialize_conversations)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

end
