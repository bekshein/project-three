class Post < ActiveRecord::Base
  belongs_to :user, foreign_key: :user_id
  # sets default order to newest to oldest
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :song_title, presence: true
  validates :artist_name, presence: true
  validates :vibe, presence: true

end
