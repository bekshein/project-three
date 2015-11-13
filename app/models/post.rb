class Post < ActiveRecord::Base

  belongs_to :user, foreign_key: :user_id
  # sets default order to newest to oldest
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :title, presence: true
  validates :source, presence: true
  validates :vibe, presence: true

end
