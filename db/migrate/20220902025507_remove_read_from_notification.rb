class RemoveReadFromNotification < ActiveRecord::Migration[7.0]
  def change
    remove_column :notifications, :is_read
  end
end
