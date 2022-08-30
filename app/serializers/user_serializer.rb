class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :created_at
end
