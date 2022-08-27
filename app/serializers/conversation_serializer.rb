class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :created_at, :last_message

  def last_message
    object.messages.last
  end

end
