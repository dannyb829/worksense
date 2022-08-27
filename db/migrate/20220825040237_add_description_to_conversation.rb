class AddDescriptionToConversation < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :description, :string
  end
end
