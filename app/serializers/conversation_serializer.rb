class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :created_at, :last_message, :notification_count

  def last_message
    object.messages.last
  end

  def notification_count
    object.notifications.where(user: current_user).length
  end

  def current_user
    scope
  end

end
