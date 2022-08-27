class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :user_id

  belongs_to :user
end
