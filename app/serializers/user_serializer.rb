class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :created_at, :participation, :total_notifications

  def participation
    user_participation = object.conversations.uniq.count
    total = Conversation.count 
    return (user_participation/total)*100 unless total == 0
    nil
  end

  def total_notifications
    object.notifications.count
  end

end
