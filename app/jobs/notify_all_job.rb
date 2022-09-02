class NotifyAllJob < ApplicationJob
  queue_as :default

  def perform(convo,user)
    users = User.where("id != ?", user.id)
    users.each do |u| convo.notifications.create(user: u) end
  end

end
