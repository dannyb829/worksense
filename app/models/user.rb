class User < ApplicationRecord
    has_secure_password
    has_many :messages, dependent: :destroy
    has_many :notifications, dependent: :destroy

    validates :username, presence: true, uniqueness: true, length: { minimum: 5},
    unless: proc { |z| z.username.blank? }
    validates :password, presence: true, on: :update, length: { minimum: 6 }, 
    unless: proc { |x| x.password.blank? }
end
