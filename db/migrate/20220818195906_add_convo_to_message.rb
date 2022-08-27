class AddConvoToMessage < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :conversation_id, :integer
  end
end
