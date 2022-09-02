class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.boolean :is_read, :default => false
      t.integer :user_id
      t.integer :conversation_id

      t.timestamps
    end
  end
end
