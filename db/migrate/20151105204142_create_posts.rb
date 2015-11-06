class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :song_title, null: false
      t.string :artist_name, null: false
      t.string :vibe, null: false
      t.integer :like, null: false

      t.references :user, index:true, foreign_key: true

      t.timestamps null: false
    end

    add_index :posts, :vibe
  end
end
